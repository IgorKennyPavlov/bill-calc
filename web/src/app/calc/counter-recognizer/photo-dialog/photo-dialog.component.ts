import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-photo-dialog',
  templateUrl: './photo-dialog.component.html',
  styleUrls: ['./photo-dialog.component.scss']
})
export class PhotoDialogComponent implements AfterViewInit, OnDestroy {
  @ViewChild('preview', { read: ElementRef, static: false }) previewCnvRef: ElementRef<HTMLCanvasElement>
  @ViewChild('video', { read: ElementRef, static: false }) videoRef: ElementRef<HTMLVideoElement>
  showPreview = false
  private _stream: MediaStream
  private _track: MediaStreamTrack
  private _cropCnv: HTMLCanvasElement = null

  constructor(private _host: MatDialogRef<PhotoDialogComponent>) {
  }

  ngAfterViewInit() {
    this._engageCamera()
  }

  ngOnDestroy() {
    this._track.stop()
  }

  async takePhoto() {
    this.showPreview = true

    const videoRect = this.videoRef.nativeElement.getBoundingClientRect()
    const capture = new ImageCapture(this._track)
    const img = new Image()

    img.addEventListener('load', () => {
      this._cropCnv = document.createElement('canvas')
      const cropCtx = this._cropCnv.getContext('2d')
      const cropOffset = { x: img.width * .1, y: img.height * .4 }
      const cropSize = { x: img.width * .8, y: img.height * .2 }

      this._cropCnv.width = cropSize.x
      this._cropCnv.height = cropSize.y

      cropCtx.drawImage(img, cropOffset.x, cropOffset.y, cropSize.x, cropSize.y, 0, 0, cropSize.x, cropSize.y)

      const previewCnv = this.previewCnvRef.nativeElement

      // TODO: подумать ещё над размерами превью
      previewCnv.width = videoRect.width
      previewCnv.height = videoRect.height * .2

      previewCnv
        .getContext('2d')
        .drawImage(this._cropCnv, 0, 0, videoRect.width, videoRect.height * .2)
    })
    img.src = URL.createObjectURL(await capture.takePhoto())
  }

  savePhoto() {
    this._host.close(this._cropCnv)
  }

  clearPhoto() {
    this.showPreview = false
    this._cropCnv = null
    setTimeout(() => this._engageCamera())
  }

  private async _engageCamera() {
    if (!this._stream) {
      this._stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: ['environment'] }
      })
    }

    if (!this._track) {
      this._track = this._stream.getVideoTracks()[0]
      // TODO: Отрегулировать параметры фотки
      // console.log(this._track.getCapabilities())
      // await this._track.applyConstraints({
      //   advanced: [{
      //     saturation: 0,
      //     brightness: 0,
      //     contrast: 50
      //   }]
      // })
    }

    const video = this.videoRef.nativeElement
    video.srcObject = this._stream
    video.play()
  }
}
