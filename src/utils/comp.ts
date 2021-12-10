import { Component, DefineComponent } from "vue";
import { App, Plugin, getCurrentInstance } from "vue";

interface Registed {
  [key: string]: boolean;
}
let registed: Registed = {};

interface Comp {
  displayName?: string;
  name?: string;
}

type RegisteComp = (comp: Comp & Plugin) => void;

const registeComp: RegisteComp = comp => {
  const name = comp.displayName || comp.name;

  if (name && !registed[name]) {
    const instance = getCurrentInstance();
    const app = instance?.appContext.app;
    if (app) {
      app.use(comp);
      registed[name] = true;
    }
  }
};

const regComp: (comp: any) => void = comp => {
  const instance = getCurrentInstance();
  const app = instance?.appContext.app;
  app?.component(comp?.name, comp);
};
export { registeComp, regComp };
