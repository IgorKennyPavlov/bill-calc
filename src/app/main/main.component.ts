import { Component } from '@angular/core'
import { createWorker } from 'tesseract.js'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  ocrResults: number[] = []
  workerInfo: any = null

  get loadingProgress(): string {
    const w = this.workerInfo
    return `${ w.status }: ${ ~~w.progress * 100 }%`
  }

  async onLoad(e: Event) {
    const input = (e as InputEvent).target as HTMLInputElement
    const files = input.files

    if (!files.length) {
      return
    }

    this.ocrResults = []

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const res = await Promise.all(
      Array.from(files).map(file => new Promise<string>((resolve, reject) => {
        try {
          const img = new Image()
          img.addEventListener('load', async () => {
            ctx.filter = 'grayscale(100%) brightness(2.4) contrast(10)'
            ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height)
            resolve(await this._ocrImg(canvas.toDataURL()))
          })
          img.src = URL.createObjectURL(file)
        } catch (err) {
          reject(err)
        }
      }))
    )

    this.ocrResults = res.map(counterData => +counterData.slice(0, 5))
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
