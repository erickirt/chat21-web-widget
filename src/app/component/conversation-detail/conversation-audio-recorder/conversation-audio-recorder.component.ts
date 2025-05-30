import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'chat-audio-recorder',
  templateUrl: './conversation-audio-recorder.component.html',
  styleUrls: ['./conversation-audio-recorder.component.scss']
})
export class ConversationAudioRecorderComponent {

  @Input() stylesMap: Map<string, string>;
  @Output() startRecordingEvent = new EventEmitter<void>();
  @Output() deleteRecordingEvent = new EventEmitter<void>();
  @Output() endRecordingEvent = new EventEmitter<Blob | null>();
  @Output() sendRecordingEvent = new EventEmitter<Blob | null>();

  mediaRecorder: MediaRecorder | null = null;
  audioChunks: Blob[] = [];
  audioBlob: Blob | null = null;
  audioUrl: SafeUrl | null = null;

  isRecording = false;
  rawAudioUrl: string | null = null;
  isPlaying: boolean = false;
  startTime: number;

  

  constructor(private sanitizer: DomSanitizer) {}


  startRecording(event: Event) {
    // console.log('startRecording');
    if (event.type === 'touchstart') {
      event.preventDefault(); // Blocca il successivo mousedown
    }

    this.startTime = Date.now();
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.start();
        this.isRecording = true;
        this.startRecordingEvent.emit();
        this.mediaRecorder.addEventListener('dataavailable', (event) => {
          this.audioChunks.push(event.data);
        });

        this.mediaRecorder.addEventListener('stop', () => {
          this.audioBlob = new Blob(this.audioChunks, { type: 'audio/mpeg' });
          this.rawAudioUrl = URL.createObjectURL(this.audioBlob);
          this.audioUrl = this.sanitizer.bypassSecurityTrustUrl(this.rawAudioUrl);
          this.audioChunks = []; 
          this.endRecordingEvent.emit(this.audioBlob);
        });
      })
      .catch(error => {
        console.error('Errore nell’accesso al microfono:', error);
      });
  }

  stopRecording(event: Event) {

    if (event.type === 'touchend') {
      event.preventDefault(); // Previene il mouseup successivo
    }

    let endTime = Date.now();
    let time = endTime - this.startTime;
    if(time > 500){
      setTimeout(() => {
        if (this.mediaRecorder) {
          this.mediaRecorder.stop();
          this.isRecording = false;
        }
      }, 300);
      
    } else {
      this.audioUrl = null;
      this.isPlaying = false;
      this.rawAudioUrl = null;
      this.audioUrl = null;
      this.audioBlob = null;
    }

   
  }

  deleteRecording() {
    this.audioUrl = null;
    this.isPlaying = false;
    this.rawAudioUrl = null;
    this.audioUrl = null;
    this.audioBlob = null;
    this.deleteRecordingEvent.emit(null);
  }

  sendMessage(){
    if (this.audioUrl) {
      this.sendRecordingEvent.emit(this.audioBlob);
      this.audioUrl = null;
    }
  }

}