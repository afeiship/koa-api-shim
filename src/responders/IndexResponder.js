import BaseResponder from './BaseResponder';
export default class IndexResponder extends BaseResponder{
  *doJob(){
    return JSON.stringify(this._app.parameters);
  }
}
