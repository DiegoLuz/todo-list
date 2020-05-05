import { Component, OnInit, Output, Input, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  modoEdicao: boolean;
  valorInput: string = "";

  @Input() set titulo(value: string){
    this.valorInput = value;
  }
  @Output() editarEmit: EventEmitter<string> = new EventEmitter<string>();
  @Output() excluirEmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() abrirItemEmit: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }


  blurInput(){
    if(this.valorInput != ''){
      this.editarEmit.emit(this.valorInput); 
      this.modoEdicao = false
    }
  }

  onKey(event: KeyboardEvent){
    if(event.keyCode == 13){
      this.blurInput();
    }
  }
}
