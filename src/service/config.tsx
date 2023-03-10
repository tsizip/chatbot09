

export const OpenAIService = {
     callApi: (QAinit:string,setQAinit:any,valueFinal:string, setFinal:any, setLogChat:any,logChat:any )=>{
          return async (text: string | any) => {
               const { Configuration, OpenAIApi } = require("openai");
               const configuration = new Configuration({
                    apiKey: `${process.env.REACT_APP_SECRET_NAME}`,
               });
               const openai = new OpenAIApi(configuration);
               const response = await openai.createCompletion({
                    model: "text-davinci-003",
                    prompt: text,
                    temperature: 0.5,
                    max_tokens: 3000,
                    top_p: 1,
                    frequency_penalty: 0,
                    presence_penalty: 0.6,
                    stop: [" Human:", " AI:"],
               });
     
               if(response.data.choices[0].text !== ''){
                    let newChat = `${response.data.choices[0].text}\\n`
                    let value = QAinit + newChat
                    await setQAinit(value)
                    valueFinal = valueFinal + newChat
                    await setFinal(valueFinal)
          
                    await setLogChat([...logChat, { type: 'AI', mess: response.data.choices[0].text }])
               } else {

                    await setLogChat([...logChat, { type: 'AI', mess: 'Please describe your question clearly!' }])
               }
          }
     }
}