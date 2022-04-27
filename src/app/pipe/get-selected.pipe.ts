import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getSelected'
})
export class GetSelectedPipe implements PipeTransform {

  transform(id: string): boolean {
    //return null;

    
      console.log("entra");
      
      if (id == "ROLE_ADMIN") {
        console.log( "si", id);
        
        return true
      }
      console.log(id);
      
      return false
    
  }



}
