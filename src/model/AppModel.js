import { TriModel, getTriAppConfig } from "@tririga/tririga-react-components";

let appModel = null;

export function createAppModel() {
  const { modelAndView, instanceId } = getTriAppConfig();
  return (appModel = new TriModel(modelAndView, instanceId));
}

export function getAppModel() {
  return appModel;
}
