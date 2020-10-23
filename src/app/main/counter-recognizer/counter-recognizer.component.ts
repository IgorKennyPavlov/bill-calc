import { Component, ElementRef, EventEmitter, OnDestroy, Output, ViewChild } from '@angular/core'
import { createWorker } from 'tesseract.js'
import { FormControl } from '@angular/forms'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-counter-recognizer',
  templateUrl: './counter-recognizer.component.html',
  styleUrls: ['./counter-recognizer.component.scss']
})
export class CounterRecognizerComponent implements OnDestroy {
  @ViewChild('preview', { read: ElementRef }) previewCanvasRef: ElementRef<HTMLCanvasElement>

  @Output() ocrComplete = new EventEmitter<string>()

  workerInfo: any = null

  recognizedText = new FormControl('00000')
  subscription: Subscription

  get loadingProgress(): string {
    const w = this.workerInfo
    return `${w.status}: ${~~w.progress * 100}%`
  }

  constructor() {
    this.subscription = this.recognizedText.valueChanges.subscribe(newVal => this.ocrComplete.emit(newVal))
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  async onLoad(e: Event) {
    const input = (e as InputEvent).target as HTMLInputElement
    const files = input.files

    if (!files.length) {
      return
    }

    this.recognizedText.reset('00000')

    // Создаём виртуальный канвас
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const file = files[0]

    const img = new Image()
    img.addEventListener('load', async () => {
      // Рисуем превью
      this.previewCanvasRef.nativeElement
        .getContext('2d')
        .drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height)

      // Фильтруем фотку в виртуальном канвасе
      ctx.filter = 'grayscale(100%) brightness(2.4) contrast(10)'
      ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height)

      // Распознаём, отрезаем до запятой, запоминаем
      this.recognizedText.setValue((await this._ocrImg(canvas.toDataURL())).slice(0, 5))
    })
    img.src = URL.createObjectURL(file)
  }

  private async _ocrImg(file: string) {
    const worker = createWorker({
      logger: workerInfo => this.workerInfo = workerInfo
    })
    await worker.load()
    await worker.loadLanguage('eng')
    await worker.initialize('eng')
    await worker.setParameters({ tessedit_char_whitelist: '0123456789.,' })
    const { data: { text } } = await worker.recognize(file)
    this.workerInfo = null
    await worker.terminate()
    return text
  }
}
