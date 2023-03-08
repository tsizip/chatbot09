import React, { useEffect, useState } from 'react'

export default function Chatbox() {

     const [click, setClick] = useState(true)

     let img1 = require('./images/1.png')
     let img2 = require('./images/2.png')


     const hiddenBox = () => {
          setClick(!click)
     }

     return (
          <div className='parent'>
               <div style={{ bottom: click ? '10px' : '-48.5%' }} className="chat-Box" onClick={hiddenBox}>
                    {/* --header-- */}
                    <div className="header_chat-Box">
                         <div className="header_chat-Box-left">
                              <div className="header_chat-BoxText">Vui lòng để lại lời nhắn </div>
                         </div>
                         <div className="header_chat-Box-right footer_chat-Box-hover">
                             {click ? <i className="fas fa-minus" /> : <i className="fas fa-plus" />}
                         </div>
                    </div>
                    {/* --content-- */}
                    <div className="content_chat-Box">
                         <div className="content_chat-BoxItem-left">
                              <img alt='img1' className="content_chat-BoxImg" src={img1} />
                              <div className="content_chat-BoxMini">
                                   <div className="content_chat-BoxText-left">helu</div>
                              </div>
                         </div>
                         <div className="content_chat-BoxItem-right">
                              <div className="content_chat-BoxMini">
                                   <div className="content_chat-BoxText-right">helo what do name</div>
                              </div>
                              <img className="content_chat-BoxImg" src={img1} />
                         </div>



                    </div>
                    {/* --footer-- */}
                    <div className="footer_chat-Box">
                         <div className="footer_chat-Box-hover">
                              <svg className="fill" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="image" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48z" /></svg>
                              {/* <svg height="30" viewBox="0 0 40 40" width="30" xmlns="http://www.w3.org/2000/svg"><g fill="#fff"><path clip-rule="evenodd" d="m22 29.9563c0-1.3631 0-2.4471.0715-3.3217.0108-.1328.0234-.2626.0382-.3898-.6265.1977-1.2916.3043-1.9806.3043-2.5272 0-4.7132-1.4282-5.8738-3.5137-.2686-.4826-.0951-1.0915.3875-1.3601.4826-.2685 1.0915-.095 1.3601.3875.8355 1.5014 2.3803 2.4863 4.1262 2.4863.9017 0 1.7442-.2612 2.4648-.7177.2347-.1487.4566-.3183.6634-.5065.5388-.6953 1.2269-1.2674 2.0188-1.6709.6992-.3563 1.4629-.5094 2.3585-.5825.8746-.0715 1.9586-.0715 3.3217-.0715h.0348 2.0013c.0077-.6325.0077-1.3385.0076-2.1381v-.1952-.1872c.0003-2.3015.0004-3.663-.3066-4.8088-.8322-3.1059-3.2582-5.5318-6.364-6.36401-1.1458-.30702-2.5073-.30689-4.8088-.30668l-.1872.00001h-1.3709c-1.832 0-3.258 0-4.4078.07844-1.1666.0796-2.1216.24328-2.9988.60665-2.2053.91344-3.95735 2.66549-4.87079 4.87079-.36337.8772-.52705 1.8322-.60665 2.9988-.07844 1.1498-.07844 2.5758-.07844 4.4078v1.3709l-.00001.1872c-.00021 2.3015-.00034 3.663.30668 4.8088.83221 3.1058 3.25811 5.5318 6.36401 6.364 1.1458.307 2.5073.3069 4.8088.3066h.1872.1952c1.2489.0001 2.2694.0002 3.1381-.0293l-.0447-2.0001.0447-.0016zm2.2456-12.0024c.8157 0 1.4769-.6613 1.4769-1.477 0-.8156-.6612-1.4769-1.4769-1.4769s-1.4769.6613-1.4769 1.4769c0 .8157.6612 1.477 1.4769 1.477zm-8.3077 0c.8157 0 1.4769-.6613 1.4769-1.477 0-.8156-.6612-1.4769-1.4769-1.4769s-1.4769.6613-1.4769 1.4769c0 .8157.6612 1.477 1.4769 1.477z" fill-rule="evenodd"></path><path d="m24.847 32.6252c1.4586-.3908 2.7945-1.0692 3.9443-1.9719 2.4203-1.7222 4.0409-4.4951 4.1964-7.6533h-2.076c-1.3701.0001-2.347.0021-3.1142.0648-.772.0631-1.2431.1825-1.6134.3712-.7527.3835-1.3646.9954-1.7481 1.7481-.1887.3703-.3081.8414-.3712 1.6134-.064.7836-.0648 1.7859-.0648 3.2025v.4381 2.3649c.2971-.0471.5771-.1055.847-.1778z"></path></g>
          </svg>
          <svg fill="#fff" height="30" viewBox="0 0 40 40" width="30" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="m20.0375 7c1.832 0 3.2581-.00001 4.4078.07844 1.1666.07959 2.1216.24328 2.9989.60664 2.2052.91345 3.9573 2.66552 4.8707 4.87072.3634.8773.5271 1.8323.6067 2.9989.0784 1.1497.0784 2.5757.0784 4.4077v.0752c0 1.832 0 3.258-.0784 4.4077-.0796 1.1666-.2433 2.1216-.6067 2.9989-.9134 2.2052-2.6655 3.9573-4.8707 4.8707-.8773.3634-1.8323.5271-2.9989.6067-1.1497.0784-2.5757.0784-4.4077.0784h-.0752c-1.832 0-3.258 0-4.4077-.0784-1.1666-.0796-2.1216-.2433-2.9989-.6067-2.2052-.9134-3.95727-2.6655-4.87072-4.8707-.36336-.8773-.52705-1.8323-.60664-2.9989-.07845-1.1497-.07844-2.5758-.07844-4.4078v-.075c0-1.832-.00001-3.2581.07844-4.4078.07959-1.1666.24328-2.1216.60664-2.9989.91345-2.2052 2.66552-3.95727 4.87072-4.87072.8773-.36336 1.8323-.52705 2.9989-.60664 1.1497-.07845 2.5758-.07844 4.4078-.07844zm9.9625 9c0-.5523-.4477-1-1-1h-3.4319c-.2524 0-.4982-.0001-.7063.0169-.2286.0187-.4984.0628-.7698.2011-.3763.1917-.6823.4977-.874.874-.1383.2714-.1824.5412-.2011.7698-.017.2081-.0169.4539-.0169.7063v6.4319c0 .5523.4477 1 1 1s1-.4477 1-1v-3h2c.5523 0 1-.4477 1-1s-.4477-1-1-1h-2v-1.4c0-.2965.0008-.4588.0103-.5754l.0012-.0132.0131-.0011c.1166-.0095.2789-.0103.5754-.0103h3.4c.5523 0 1-.4477 1-1zm-8.5.0294c0-.5523-.4477-1-1-1s-1 .4477-1 1v.4706c0 .5523.4477 1 1 1s1-.4477 1-1zm0 3.2941c0-.5523-.4477-1-1-1s-1 .4477-1 1v4.7059c0 .5523.4477 1 1 1s1-.4477 1-1zm-11.5.6765c0-2.7614 2.2386-5 5-5h2c.5523 0 1 .4477 1 1s-.4477 1-1 1h-2c-1.6569 0-3 1.3431-3 3s1.3431 3 3 3h.9281c.2761 0 .5-.2239.5-.5v-1c0-.2761-.2239-.5-.5-.5h-.9281c-.5523 0-1-.4477-1-1s.4477-1 1-1h1.5c1.1084 0 1.9879.8948 2.0145 1.9759l.0034.1331.0023.0912c.0113.4547.0202.896-.0067 1.2783-.0312.4444-.1167.9526-.4073 1.4007-.3139.4841-.7787.7677-1.3098.9244-.5019.148-1.1059.1964-1.7964.1964-2.7614 0-5-2.2386-5-5z" fill-rule="evenodd"></path></svg> */}
                         </div>

                         <div className="footer_chat-Box-input">
                              <input type="text" placeholder="Aa" className="footer-text" />
                         </div>
                         <div className="footer_chat-Box-hover">
                              <svg className="fill" fill="#fff" viewBox="0 0 24 24" width="20px"><path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 C22.8132856,11.0605983 22.3423792,10.4322088 21.714504,10.118014 L4.13399899,1.16346272 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.8376543,3.0486314 1.15159189,3.99121575 L3.03521743,10.4322088 C3.03521743,10.5893061 3.34915502,10.7464035 3.50612381,10.7464035 L16.6915026,11.5318905 C16.6915026,11.5318905 17.1624089,11.5318905 17.1624089,12.0031827 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z" /></svg>
                         </div>
                    </div>
               </div>

          </div>
     )
}
