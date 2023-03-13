import { includes } from "lodash";
import { MODEL, TEXT_ERR } from "../constants/dataConst";


// # tri
// # REACT_APP_SECRET_NAME = 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
// # bao

export const OpenAIService = {
     callApi: (QAinit: string, setTyping: any, typing: any, setQAinit: any, valueFinal: string, setFinal: any, setLogChat: any, logChat: any, setPrompt: any, prompt: any, logChatOld: any, setLogChatOld: any, xuly: any, err: any, setErr: any) => {
          return async (text: string | any) => {
               await console.log('text prompt', text)
               let spam = 0
               const { Configuration, OpenAIApi } = require("openai");
               const configuration = new Configuration({
                    // apiKey: `${process.env.REACT_APP_SECRET_NAME}`,
                    apiKey: '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'
               });
               const openai = new OpenAIApi(configuration);
               const response = await openai.createCompletion({
                    model:MODEL,
                    prompt: text,
                    temperature: 0.3,
                    max_tokens: 2000,
                    top_p: 1,
                    frequency_penalty: 0,
                    presence_penalty: 0,
                    stop: ["#END#"],
               });
               // stop: [" Human:", " AI:"],
               let res = await response.data.choices[0].text

               // console.log('res',res)
               if (res.includes('§') !== true && res.includes('END') !== true && res.includes('END OF DOC') !== true && res.includes('str.format') !== true && res.includes('#') !== true && res.includes('\\n') !== true && res.includes('stdout') !== true && res.includes(text) !== true) {
                    // if (res !== "" && res !== " ") {
                    let newChat = `${response.data.choices[0].text} `
                    let value = QAinit + newChat
                    await setQAinit(value)
                    // valueFinal = valueFinal + newChat
                    valueFinal = newChat + valueFinal
                    await setFinal(valueFinal)
                    // await setLogChatOld([...logChat])
                    await setLogChat([...logChat, { type: 'AI', mess: response.data.choices[0].text }])
                    await setTyping(false)
                    // await console.log(logChat)

                    // } else {
                    //      await setErr(err++)
                    //      let value = await localStorage.getItem('valuebackup')
                    //      await console.log('value backup', value)
                    //      xuly(value)


                    // }

               } else {
                    spam++
                    // alert('vui long nhap du lieu hop le')
                    if (spam >= 5) {
                         await setLogChat([...logChat, { type: 'AI', mess: TEXT_ERR }])

                         await setLogChatOld(logChat)
                         await setPrompt('')
                         await setTyping(false)
                    } else {
                         await setLogChat([...logChat, { type: 'AI', mess: TEXT_ERR }])
                         await setPrompt('')
                         await setTyping(false)
                    }

               }
          }
     }
}