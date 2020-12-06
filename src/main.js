
const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x =localStorage.getItem('数据')
const xObject = JSON.parse(x)
let isFalse=true
const logoUrl ='/favicon.ico'
const hashMap =xObject||[
    { logo:'',url:'https://www.acfun.cn',name:'a站' },
    {logo:'',url:'https://www.bilibili.com/',name:'b站'},
    {logo:'',url:'https://github.com/',name:'github'},
    {logo:'',url:'https://www.nowcoder.com/',name:'牛客'}
]
const simplifyUrl=(url)=>{
    return url.replace('https://','')
    .replace('http://','')
    .replace('www.','')
    .replace(/\/.*/,'')
    
}
const render =()=>{
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node,index)=>{
    node.logo=node.url+logoUrl
    const $li =$(`<li >
                <div class="site">
                    <div class="sel">
                        <div class="revise">修改快捷方式</div>
                        <div class="remove">移除</div>
                    </div>
                    
                        <div class="icon-btn" id='iconBtn'>
                        <svg class="icon">
                            <use xlink:href="#iconziyuan"></use>
                        </svg>
                    </div>
                        <div class="logo"><img src=${node.logo} alt:'没有图片'></div>
                        <div class="link">${node.name}</div>
                    
                </div>
            </li>`).insertBefore($lastLi)
        $sel=$('.sel')
        $iconBtn=$('.icon-btn')
        $li.on('click',()=>{
            window.open(node.url)
        })
        $li.on('click','.icon-btn',function(e){    
            e.stopPropagation()      
                  if($sel[index].style.display==='block'){
                   $sel[index].style.display='none'
               }else {
                   $sel[index].style.display='block'
               }
        })
        $li.on('click','.remove',(e)=>{
            e.stopPropagation()
            hashMap.splice(index,1)
            render()
        })
        $li.on('click','.revise',(e)=>{
            e.stopPropagation()
            $dialogWapper.style.display='block'
            $finish.onclick=()=>{
            let url = $input2.value
            let name =$input1.value
            if(!$input2.value){
                $tips.innerText='还没有填写网址哟~'
            }else if(url.indexOf('http')!==0){
                url = 'https://'+url
                $tips.innerText=''
                hashMap[index].url=url
                if(!$input1.value){
                    $tips.innerText='还没有填写名称哟~'
                }else if($input1.value!==''){
                    $tips.innerText=''
                    hashMap[index].name=name
                }
            }
                if(name&&url){
                    $siteList.find('li:not(.last)').remove()
                    render()
                    $dialogWapper.style.display='none'
                    $input1.value=''
                    $input2.value=''
                }
            }
            $del.onclick=()=>{
                $input1.value=''
                $input2.value=''
            }
            $cancel.onclick=()=>{
                $dialogWapper.style.display='none'
            }
            render()
        })
})
}
render()
const $dialogWapper=$('.dialogWapper')[0]
const $input1=$('#input1')[0]
const $input2=$('#input2')[0]
const $del=$('#del')[0]
const $cancel=$('#cancel')[0]
const $finish=$('#finish')[0]
const $tips=$('.tips')[0]
const $cover=$('#cover')[0]
let $sel=$('.sel')
let $iconBtn=$('#iconBtn')
let $color=$('#color')[0]
let $body=$('body')[0]
let $dialogText1=$('.dialogText')[0]
let $dialogText2=$('.dialogText')[1]

$color.onchange=()=>{
    $body.style.backgroundColor=$color.value
}
$input1.onclick=()=>{
    $dialogText1.style.color='blue'
    $dialogText2.style.color='#808080'
}
$input2.onclick=()=>{
    $dialogText2.style.color='blue'
    $dialogText1.style.color='#808080'
}

$cover.onclick=()=>{
    for(let i=0;i<$sel.length;i++){
        if($sel[i].style.display==='block'){
            $sel[i].style.display='none'
        }
    }
}




$('.siteAdd ').on('click',()=>{
    $dialogWapper.style.display='block'
    $finish.onclick=()=>{
    let url = $input2.value
    let name =$input1.value
            if(!$input2.value){
                $tips.innerText='还没有填写网址哟~'
            }else if(url.indexOf('http')!==0){
                url = 'https://'+url
                $tips.innerText=''
                if(!$input1.value){
                    $tips.innerText='还没有填写名称哟~'
                }else if($input1.value!==''){
                    $tips.innerText=''
                    
                
                }
            }
                if(name&&url){
                    hashMap.push({logo:'',url:url,name:name})
                    $siteList.find('li:not(.last)').remove()
                    render()
                    $dialogWapper.style.display='none'
                    $input1.value=''
                    $input2.value=''
                }
    }
    $del.onclick=()=>{
        $input1.value=''
        $input2.value=''
    }
    $cancel.onclick=()=>{
        $dialogWapper.style.display='none'
    }
})
window.onbeforeunload=()=>{
    const string = JSON.stringify(hashMap)
    localStorage.setItem('数据',string)
}