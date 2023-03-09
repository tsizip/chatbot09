// tsrfc

import React, { useEffect, useRef, useState } from 'react'

type Props = {}

export default function Boxchat({ }: Props) {
     // const [test ,setTest] = useState(['2'])
     let valueFinal = ''
     const [final, setFinal] = useState(String)
     const myRef = useRef<null | HTMLDivElement>(null)
     const [click, setClick] = useState(true)
     const [prompt, setPrompt] = useState('')
     const [logChat, setLogChat] = useState([
          { type: 'AI', mess: 'xin chao, toi co the giup gi cho ban?' },
          // { type: 'Human', mess: 'any question' }
     ])
     // console.log(...logChat);
     


     const [QAinit, setQAinit] = useState(String)

     // const [QA, setQA] = useState(Array)

     let img1 = require('../asset/images/1.png')

     const hiddenBox = () => {
          setClick(!click)
     }
     const executeScroll = () => {
          if (myRef) {
               myRef.current?.scroll({ top: myRef.current?.scrollHeight, behavior: 'smooth' })
          }
     }

     const xuly = async () => {

          
          let logChatFilter = []
          for (let i = 1; i < logChat.length; i++) {
               logChatFilter.push(logChat[i])
          }
          

         
         


          callApi(valueFinal + final)

          // await callApi("Human: what is redux\nAI: Redux is a library for managing application state. It is most commonly used with React, but can be used with any other JavaScript framework. Redux allows developers to store and manage application state in a single place and access it in multiple components throughout an application.\nHuman: what is the lastes this version\nAI: The latest version of Redux is v4.0.1, released on March 25, 2020.")
     }


     const callApi = async (text: string) => {
          const { Configuration, OpenAIApi } = require("openai");
          const configuration = new Configuration({
               apiKey: "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",
          });
          const openai = new OpenAIApi(configuration);
          const response = await openai.createCompletion({
               model: "text-davinci-003",
               // prompt:text,
               prompt: text,
               // max_tokens: 4000,
               // temperature: 0.7,
               temperature: 0.1,
               max_tokens: 4000,
               top_p: 1,
               frequency_penalty: 0,
               presence_penalty: 0.6,
               stop: [" Human:", " AI:"],
          });
     
          let newChat = `AI: ${response.data.choices[0].text}\\n`
          let value = QAinit + newChat
          await setQAinit(value)
          valueFinal = await valueFinal + newChat
          await setFinal(final + valueFinal)
          await setLogChat([...logChat, { type: 'AI', mess: response.data.choices[0].text }])
          // await setQA([...QA, { type: 'AI', mess: response.data.choices[0].text }])

          // console.log('logchat', logChat)
          console.log(response.data.choices[0].text)
          console.log('value', valueFinal)
          console.log('response',response)
     }

     useEffect(() => {
          executeScroll()
          // console.log('QA', QA)
          // console.log('value',valueFinal)
          // console.log('QA', QAinit)
          // console.log('prom', prompt)
          console.log('final', final)
     }, [QAinit])



     return (
          <div>
               <div className='parent'>
                    <div className="chat-Box">
                         {/* --header-- */}
                         <div className="header_chat-Box">
                              <div className="header_chat-Box-left" onClick={hiddenBox}>
                                   <div className="header_chat-BoxText">Vui lòng để lại lời nhắn </div>
                              </div>
                              <div className="header_chat-Box-right footer_chat-Box-hover" onClick={hiddenBox}>
                                   {click ? <i className="fas fa-minus" /> : <i className="fas fa-plus" />}
                              </div>
                         </div>
                         {/* --content-- */}
                         <div style={{ display: click ? 'block' : 'none' }} ref={myRef} className="content_chat-Box">
                              {logChat?.map((value, index) => {
                                   if (value.type === 'Human') {
                                        return (<div key={index} className="content_chat-BoxItem-right">
                                             <div className="content_chat-BoxMini">
                                                  <div className="content_chat-BoxText-right">{value.mess}</div>
                                             </div>
                                             <img className="content_chat-BoxImg" src={img1} />
                                        </div>)
                                   }
                                   if (value.type === 'AI') {
                                        return (<div key={index} className="content_chat-BoxItem-left">
                                             <img alt='img1' className="content_chat-BoxImg" src={img1} />
                                             <div className="content_chat-BoxMini">
                                                  <div className="content_chat-BoxText-left">{value.mess}</div>
                                             </div>
                                        </div>)
                                   }


                              })}

                         </div>
                         {/* --footer-- */}
                         <div className='ft' style={{ display: click ? 'block' : 'none' }}>
                              <div className="footer_chat-Box">
                                   <div className="footer_chat-Box-hover">
                                        <svg className="fill" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="image" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48z" /></svg>
                                   </div>

                                   <form onSubmit={async function (e) {
                                        e.preventDefault()
                                        let arr = await logChat
                                        await arr.push({ type: 'Human', mess: prompt })

                                        await setLogChat(arr)
                                        let promptValue = `Human: ${prompt}\\n`
                                        await setQAinit(promptValue)
                                        valueFinal = await valueFinal + promptValue
                                        await setFinal(final + valueFinal)
                                        await xuly()



                                        await setPrompt('')
                                        // console.log('prom', prompt)
                                        // const inputValue = document.getElementById("#inputChat")
                                        // inputValue?.innerText = ''


                                   }} className="footer_chat-Box-input">
                                        <input id='inputChat' value={prompt} type="text" placeholder="Aa" className="footer-text" onChange={(e) => {
                                             setPrompt(e.target.value)
                                        }} />
                                   </form>
                                   <div className="footer_chat-Box-hover" onClick={() => {
                                        // callApi(prompt)

                                   }}>
                                        <svg className="fill" fill="#fff" viewBox="0 0 24 24" width="20px"><path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 C22.8132856,11.0605983 22.3423792,10.4322088 21.714504,10.118014 L4.13399899,1.16346272 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.8376543,3.0486314 1.15159189,3.99121575 L3.03521743,10.4322088 C3.03521743,10.5893061 3.34915502,10.7464035 3.50612381,10.7464035 L16.6915026,11.5318905 C16.6915026,11.5318905 17.1624089,11.5318905 17.1624089,12.0031827 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z" /></svg>
                                   </div>
                              </div>
                         </div>
                    </div>

               </div>
          </div>
     )
}