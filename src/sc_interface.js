const Interface = require('es6-interface');
const constructorMethor = new Set(['constructor(args)']);
const mainMethod = new Set(['main(funcName,args)']);
const fallbackMethod = new Set(['fallback(args)']);
 
export class SCInterface extends Interface(constructorMethor,mainMethod,fallbackMethod) {
  constructor() {
    super()
  }
 
}