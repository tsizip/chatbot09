// tsrfc

import React, { useEffect, useRef, useState } from 'react'
import { OpenAIService } from '../service/config'
import moment from 'moment'


type Props = {}

export default function Boxchat({ }: Props) {
     const [count, setCount] = useState(0)
     let valueFinal = ''
     const [final, setFinal] = useState(String)
     const myRef = useRef<null | HTMLDivElement>(null)
     const [click, setClick] = useState(true)
     const [prompt, setPrompt] = useState('')
     const [logChat, setLogChat] = useState([
          { type: 'AI', mess: 'Xin chào, tôi có thể giúp gì cho bạn?' },
     ])

     const [logChatOld, setLogChatOld] = useState([
          { type: 'AI', mess: 'Xin chào, tôi có thể giúp gì cho bạn?' },
     ])

    
     const [typing, setTyping] = useState(false)
     const [QAinit, setQAinit] = useState(String)

     let img1 = require('../asset/images/chatbot.png')

     const hiddenBox = () => {
          setClick(!click)
     }
     const executeScroll = () => {
          if (myRef) {
               myRef.current?.scroll({ top: myRef.current?.scrollHeight, behavior: 'smooth' })
          }
     }

     const xuly = async () => {
          let value = valueFinal + final
          // console.log('data prompt', value)
          if (count <= 1) {
               callApi(value)
          } else {
               callApi(localStorage.getItem('data'))
          }

     }

     const callApi = OpenAIService.callApi(QAinit, setTyping, typing, setQAinit, valueFinal, setFinal, setLogChat, logChat, setPrompt, prompt, logChatOld, setLogChatOld)

     useEffect(() => {
          executeScroll()
          localStorage.setItem('data', final)
          // console.log('logChat', logChat)
          console.log('data prompt', final)

     }, [final])


     // test include
     // let text = "' ' § Code # 5 t = '' for x in t: print(x) § Output > stdout : ['p\n', 'y\n', 't\n', 'h\n', 'o\n', 'n\n'] § Code #6 t = (1,2,3,4,5) for num in t: print(num) § Output > stdout : ['1\n', '2\n', '3\n', '4\n', '5\n'] § Code #7 l = [1, 2, 3, 4, 5] for num in l: num += 1 print(num) § Output > stdout : ['2\n', '3\n', '4\n', '5\n', '6\n'] § Code #8 d = {'x':1, 'y':2, 'z':3} for key, value in d.items(): print(key, ) § Output > stdout :  § Code #9 l = [1, 2, 3, 4, 5] total = 0 for num in l: total += num print(total) § Output > stdout : ['15\n'] § Code #10 d = {'x':1, 'y':2, 'z':3} for key in d: print(key) § Output > stdout : ['x\n', 'y\n', 'z\n'] § Code § END OF DOC"
     // console.log(text.includes('§'))
     // console.log()

     return (
          <div>
               <div className='parent'>
                    <div className="chat-Box" style={{ width: !click ? '225px' : '300px'}}>
                         {/* --header-- */}
                         <div className='header'>
                              <div className="header_chat-Box">
                                   <div className="header_chat-Box-left" style={{justifyContent: click ? 'unset' : 'center'}} onClick={hiddenBox}>
                                        <img alt='img1' className="content_chat-BoxImg" src={img1} />
                                        <div className="header_chat-BoxText">
                                             <p className='header_nameBot'>Mekomed Chatbot</p>
                                             <p className='header_statusBot'><i className="fa fa-dot-circle"></i> Online now</p>
                                        </div>
                                        {/* <iframe src="https://embed.lottiefiles.com/animation/12966"></iframe> */}

                                   </div>
                                   <div style={{display: click ? 'block' : 'none'}} className="header_chat-Box-right footer_chat-Box-hover" onClick={hiddenBox}>
                                        {click ? <i className="fas fa-minus" /> : <i className="fas fa-plus" />}
                                   </div>
                              </div>
                         </div>
                         {/* --content-- */}
                         <div style={{ display: click ? 'block' : 'none' }} ref={myRef} className="content_chat-Box">


                              {/* <img src="./typingchat.gif" ></img>  */}

                              <p className='dateTime'>{moment(Date.now()).format('hh:mm A')}</p>
                              {logChat?.map((value, index) => {
                                   if (value.type === 'Human') {
                                        return (<div key={index} className="content_chat-BoxItem-right">
                                             <div className="content_chat-BoxMini">
                                                  <div className="content_chat-BoxText-right">{value.mess}</div>
                                             </div>
                                             {/* <img className="content_chat-BoxImg" src={img1} /> */}
                                        </div>)
                                   }
                                   if (value.type === 'AI') {
                                        return (<div key={index} className="content_chat-BoxItem-left">

                                             <img alt='img1' className="content_chat-BoxImg" src={img1} />
                                             <div className="content_chat-BoxMini d-flex">
                                                  <p className='bot_name'>MekomedBot</p>
                                                  <div className="content_chat-BoxText-left">{value.mess}</div>
                                             </div>
                                        </div>)
                                   }
                              })}

                         </div>
                         {/* --footer-- */}
                         <div className='ft' style={{ display: click ? 'block' : 'none' }}>
                              {typing ? <img src='https://raw.githubusercontent.com/reachtokish/typing-animation/master/giphy.gif' className='typing_load' /> : null}
                              <div className='ft_bot'>
                                   <div className="footer_chat-Box">
                                        {/* <div className="footer_chat-Box-hover">
                                             <svg className="fill" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="image" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48z" /></svg>
                                        </div> */}

                                        <form onSubmit={async function (e) {
                                             e.preventDefault()
                                             await setTyping(true)
                                             await setCount(count + 1)
                                             let arr = await logChat

                                             let checkSpam = await prompt.includes(' ')
                                             if (checkSpam) {
                                                  await arr.push({ type: 'Human', mess: prompt })

                                                  await setLogChat(arr)
                                                  let promptValue = `${prompt}\\n`
                                                  console.log('submit', promptValue)
                                                  await setQAinit(promptValue)
                                                  valueFinal = valueFinal + promptValue
                                                  await setFinal(valueFinal + final)
                                                  await xuly()
                                                  await setPrompt('')
                                             } else {
                                                  alert('vui long nhap du lieu hop le')
                                                  await setTyping(false)
                                                  await setPrompt('')
                                             }



                                        }} className="footer_chat-Box-input">
                                             <input id='inputChat' value={prompt} type="text" placeholder="Type a Message..." className="footer-text" onChange={(e) => {
                                                  setPrompt(e.target.value)
                                             }} />
                                        </form>
                                        <div className="footer_chat-Box-hover" onClick={async function () {
                                             // await setCount(count + 1)
                                             // let arr = await logChat
                                             // await arr.push({ type: 'Human', mess: prompt })

                                             // await setLogChat(arr)
                                             // let promptValue = `${prompt}\\n`
                                             // console.log('submit', promptValue)
                                             // await setQAinit(promptValue)
                                             // valueFinal = valueFinal + promptValue
                                             // await setFinal(valueFinal + final)

                                             // await xuly()
                                             // await setPrompt('')
                                             await setTyping(true)
                                             await setCount(count + 1)
                                             let arr = await logChat

                                             let checkSpam = await prompt.includes(' ')
                                             if (checkSpam) {
                                                  await arr.push({ type: 'Human', mess: prompt })

                                                  await setLogChat(arr)
                                                  let promptValue = `${prompt}\\n`
                                                  console.log('submit', promptValue)
                                                  await setQAinit(promptValue)
                                                  valueFinal = valueFinal + promptValue
                                                  await setFinal(valueFinal + final)
                                                  await xuly()
                                                  await setPrompt('')
                                             } else {
                                                  alert('vui long nhap du lieu hop le')
                                                  await setTyping(false)
                                                  await setPrompt('')
                                             }

                                        }}>
                                             <svg className="fill" fill='#008000' viewBox="0 0 24 24" width="20px"><path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 C22.8132856,11.0605983 22.3423792,10.4322088 21.714504,10.118014 L4.13399899,1.16346272 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.8376543,3.0486314 1.15159189,3.99121575 L3.03521743,10.4322088 C3.03521743,10.5893061 3.34915502,10.7464035 3.50612381,10.7464035 L16.6915026,11.5318905 C16.6915026,11.5318905 17.1624089,11.5318905 17.1624089,12.0031827 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z" /></svg>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>

               </div>
          </div>
     )
}