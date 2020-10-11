import { Component, ElementRef, ViewChild } from '@angular/core'
import { createWorker } from 'tesseract.js'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  @ViewChild('img', { read: ElementRef }) imgElRef: ElementRef<HTMLImageElement>

  ocrResult: string
  imgSrc = ''
  workerInfo: any = null

  get loadingProgress(): string {
    const w = this.workerInfo
    return `${ w.status }: ${ ~~w.progress * 100 }%`
  }

  async onLoad(e: Event) {
    const input = (e as InputEvent).target as HTMLInputElement
    const files = input.files
    const file = files[0]

    try {
      this.imgSrc = await this._toBase64(file)
    } catch (err) {
      console.log(err)
    }

    this._handleImgs(files)
  }

  private async _handleImgs(files: FileList) {
    const worker = createWorker({
      logger: workerInfo => {
        this.workerInfo = workerInfo
        // console.log({ workerInfo })
      }
    })
    await worker.load()
    await worker.loadLanguage('eng')
    await worker.initialize('eng')
    await worker.setParameters({ tessedit_char_whitelist: '0123456789.,' })
    const { data: { text } } = await worker.recognize(files[0])
    this.ocrResult = text
    this.workerInfo = null
    await worker.terminate()
  }

  private _toBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = error => reject(error)
  })
}
