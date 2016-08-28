import BaseResponder from './BaseResponder';
export default class ExampleResponder extends BaseResponder{
  *doJob(){
    return JSON.stringify(this._app.parameters);
  }
}
