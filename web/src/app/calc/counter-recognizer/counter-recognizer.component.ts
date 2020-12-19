import { Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'

import { Subscription } from 'rxjs'
import { createWorker } from 'tesseract.js'

import { PhotoDialogComponent } from './photo-dialog/photo-dialog.component'

@Component({
  selector: 'app-counter-recognizer',
  templateUrl: './counter-recognizer.component.html',
  styleUrls: ['./counter-recognizer.component.scss']
})
export class CounterRecognizerComponent implements OnDestroy {
  private _subs: Subscription[] = []

  @ViewChild('preview', { read: ElementRef }) previewCanvasRef: ElementRef<HTMLCanvasElement>

  @Input() brightness = 2.4
  @Input() contrast = 10

  @Output() ocrComplete = new EventEmitter<string>()

  workerInfo: any = null

  get loadingProgress(): string {
    const w = this.workerInfo
    return w ? `${ w.status }: ${ ~~w.progress * 100 }%` : ''
  }

  constructor(private _dialog: MatDialog) {
  }

  ngOnDestroy() {
    this._subs.forEach(s => s.unsubscribe())
  }

  async onLoad(e: Event) {
    const input = (e as InputEvent).target as HTMLInputElement
    const files = input.files

    if (!files.length) {
      return
    }

    const file = files[0]
    const img = new Image()

    img.addEventListener('load', () => this._handleImage(img))
    img.src = URL.createObjectURL(file)
  }

  private async _ocrImg(file: string) {
    const worker = createWorker({ logger: workerInfo => this.workerInfo = workerInfo })
    await worker.load()
    await worker.loadLanguage('eng')
    await worker.initialize('eng')
    await worker.setParameters({ tessedit_char_whitelist: '0123456789.,' })
    const { data: { text } } = await worker.recognize(file)
    this.workerInfo = null
    await worker.terminate()
    return text
  }

  openPhotoDialog() {
    this._subs.push(
      this._dialog.open(PhotoDialogComponent, { maxWidth: '95vw', maxHeight: '90vh' })
        .afterClosed()
        .subscribe((cropCnv: HTMLCanvasElement) => this._handleImage(cropCnv))
    )
  }

  private async _handleImage(img: HTMLImageElement | HTMLCanvasElement) {
    // Рисуем превью
    const previewCnv = this.previewCanvasRef.nativeElement
    previewCnv
      .getContext('2d')
      .drawImage(img, 0, 0, img.width, img.height, 0, 0, previewCnv.width, previewCnv.height)

    // Создаём виртуальный канвас
    const virtualCnv = document.createElement('canvas')
    const virtualCnvCtx = virtualCnv.getContext('2d')

    // Фильтруем фотку в виртуальном канвасе
    virtualCnvCtx.filter = `grayscale(100%) brightness(${ this.brightness || 2.4 }) contrast(${ this.contrast || 10 })`
    virtualCnvCtx.drawImage(img, 0, 0, img.width, img.height, 0, 0, virtualCnv.width, virtualCnv.height)

    // Удалить после настройки фотки
    // document.body.prepend(virtualCnv)

    // Распознаём, отрезаем до запятой, запоминаем
    this.ocrComplete.emit((await this._ocrImg(virtualCnv.toDataURL())).slice(0, 5))
  }
}
