import { Component, OnInit } from '@angular/core';
import { PoNotificationService, PoPageModule } from '@po-ui/ng-components';
import { DownloaderService } from './services/downloader.service';
import { DownloaderModel } from './models/downloader.model';
import { Title } from '@angular/platform-browser';
import { TypeEnum, TypeOptions } from './enums/type.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loading: boolean = false;
  loadingMessage: string = 'Carregando...';

  data:DownloaderModel = new DownloaderModel();

  typeOptions = TypeEnum.Type;

  constructor(
    private service: DownloaderService,
    private notificationService:PoNotificationService,
    private titleService: Title){
    } 

  ngOnInit(){
    this.titleService.setTitle('Downloader Music and Video - Youtube');
  }

  onChangeType(event:string){    
    this.data.type = event;
  }

  onSubmit(){
    if (this.data.type !== TypeOptions.MUSIC && this.data.type !== TypeOptions.VIDEO) {
      this.notificationService.error('Selecione um tipo válido (música ou vídeo).');
      return;
    }

    if ((!this.data.url.includes("https://") || !this.data.url.includes("http://")) && !this.data.url.includes("youtube") && !this.data.url.includes("watch?=v")) {
      this.notificationService.error('URL inválido!');
      return;
    }

    this.showLoading("Carregando...");

    this.service.download(this.data).subscribe(
      response => {
        this.hideLoading();

        if (!response.body) {
          this.notificationService.error('Error process file.');
          return;
        }

        const blob = new Blob([response.body], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        let fileName = 'file';

        const contentDisposition = response.headers.get('Content-Disposition');
        if (contentDisposition) {
          const fileNameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          const matches = fileNameRegex.exec(contentDisposition);
          if (matches != null && matches[1]) {
            fileName = matches[1].replace(/['"]/g, '');
          }
        }

        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
        this.notificationService.success('Download success!');
      },
      error => {   
        this.hideLoading();
        this.notificationService.error(`Error trying download: ${error.statusText}`);
      }
    );
  }

  showLoading(message:string){
    this.loadingMessage = message;
    this.loading = true;
  }

  hideLoading(){
      this.loading = false;
  }
}
