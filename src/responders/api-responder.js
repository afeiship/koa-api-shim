import BaseResponder from 'core/base-responder';
export default class extends BaseResponder{
  *doJob(){
    return JSON.stringify(this._app.parameters);
  }
}
