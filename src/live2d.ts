// @ts-nocheck
import * as PIXI from 'pixi.js'

import { InternalModel, Live2DModel, MotionPreloadStrategy } from 'pixi-live2d-display/cubism4'

window.PIXI = PIXI
export async function initModel(modelJson, canvasID) {
  // 引入模型
  // const model = await Live2DModel.from('../../src/assets/HK416_805/hk416_805.model.json')
  const model = await Live2DModel.from(modelJson, { autoInteract: false })
  document.getElementById(canvasID).addEventListener('pointerdown', (event) => model.tap(event.clientX, event.clientY))
  // 创建模型对象
  PIXI.settings.RESOLUTION = 2
  const app = new PIXI.Application({
    view: document.getElementById(canvasID),
    autoStart: true,
    resizeTo: window,
    antialias: true,
    // 透明
    backgroundColor: 0xffffff,
    backgroundAlpha: 0
  })

  // 添加模型到舞台
  app.stage.addChild(model)
  // 模型的缩放
  model.scale.set(0.15)
  model.on('hit', (hitAreaNames: string[]) => {
    console.log(hitAreaNames)
    if (hitAreaNames.includes('Head')) {
      // body is hit
      model.motion('Tap', 0)
    } else if (hitAreaNames.includes('Body')) {
      // body is hit
      model.motion('Tap', 1)
    }
  })
  // 模型的位置,x,y相较于窗口左上角
  model.x = -(model.width - document.getElementById(canvasID).clientWidth) / 2
  model.y = -(model.height - document.getElementById(canvasID).clientHeight) / 2
  // model.y = 0
  // 添加模型状态管理器
  model.InternalModel = new InternalModel(model)
  return { model, app }
}
