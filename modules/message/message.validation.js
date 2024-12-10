
import joi from 'joi';

export const sendMessageSchema= {
    body:joi.object({
      message :joi.string().min(1).max(100).required()
    }),
    params:joi.object({
      recivedId:joi.string().length(24)
    })
}