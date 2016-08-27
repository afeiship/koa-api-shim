import path from 'path';

export default function (inConfig) {
  return function * (next) {
      this.config = inConfig;
      yield next;
    };
};
