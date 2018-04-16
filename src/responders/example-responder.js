import BaseResponder from '../core/base-responder';
export default class ExampleResponder extends BaseResponder{
  *doJob(){
    return JSON.stringify(this._app.parameters);
  }
}
