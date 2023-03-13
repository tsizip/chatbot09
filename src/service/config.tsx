import { includes } from "lodash";


export const OpenAIService = {
     callApi: (QAinit: string, setTyping: any, typing: any, setQAinit: any, valueFinal: string, setFinal: any, setLogChat: any, logChat: any, setPrompt: any, prompt: any, logChatOld: any, setLogChatOld: any) => {
          return async (text: string | any) => {
               let spam = 0
               const { Configuration, OpenAIApi } = require("openai");
               const configuration = new Configuration({
                    apiKey: `${process.env.REACT_APP_SECRET_NAME}`,
               });
               const openai = new OpenAIApi(configuration);
               const response = await openai.createCompletion({
                    model: "text-davinci-003",
                    prompt: text,
                    temperature: 0.9,
                    max_tokens: 3000,
                    top_p: 1,
                    frequency_penalty: 0,
                    presence_penalty: 0.6,
                    stop: [" Human:", " AI:"],
               });
               let res = await response.data.choices[0].text

               // console.log('res',res)
               if (res.includes('§') !== true && res.includes('END OF DOC') !== true && res.includes('str.format') !== true && res.includes('#') !== true && res.includes('\\n') !== true && res.includes('stdout') !== true) {
                    let newChat = `${response.data.choices[0].text}\\n`
                    let value = QAinit + newChat
                    await setQAinit(value)
                    valueFinal = valueFinal + newChat
                    await setFinal(valueFinal)
                    // await setLogChatOld([...logChat])
                    await setLogChat([...logChat, { type: 'AI', mess: response.data.choices[0].text }])
                    await setTyping(false)
                    // await console.log(logChat)
               } else {
                    spam++
                    // alert('vui long nhap du lieu hop le')
                    if (spam >= 5) {
                         await setLogChat([...logChat, { type: 'AI', mess: 'Tôi không hiểu bạn đang nói gì. Vui lòng gửi lại 1 câu hỏi khác!' }])
                         // await setLogChat([{ type: 'AI', mess: 'Xin chào, tôi có thể giúp gì cho bạn?' }, { type: 'Human', mess: prompt }, , { type: 'AI', mess: 'Tôi không hiểu bạn đang nói gì. Vui lòng gửi lại 1 câu hỏi khác!' }])
                         await setLogChatOld(logChat)
                         await setPrompt('')
                         await setTyping(false)
                    } else {
                         await setLogChat([...logChat, { type: 'AI', mess: 'Tôi không hiểu bạn đang nói gì. Vui lòng gửi lại 1 câu hỏi khác!' }])
                         await setPrompt('')
                         await setTyping(false)
                    }

               }
          }
     }
}