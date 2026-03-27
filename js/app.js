// Rainbow Bridge Enterprise v2 - Complete App
(function(){
  var DB={
    user:null,
    tasks:[],
    chats:[],
    members:[],
    accounts:[],
    meetings:[],
    albums:[],
    settings:{}
  };

  function save(k){localStorage.setItem('rb2_'+k,JSON.stringify(DB[k]));}
  function load(k){try{DB[k]=JSON.parse(localStorage.getItem('rb2_'+k)||'[]');}catch(e){DB[k]=[];}}

  function initData(){
    DB.user={name:'陈默',phone:'13800138000',dept:'产品运营部',role:'产品经理',avatar:''};
    DB.members=[
      {id:1,name:'陈默',phone:'13800138000',dept:'产品运营部',role:'产品经理',online:true,avatar:''},
      {id:2,name:'张伟',phone:'13800138001',dept:'技术研发部',role:'技术负责人',online:true,avatar:''},
      {id:3,name:'刘芳',phone:'13800138002',dept:'产品运营部',role:'运营主管',online:true,avatar:''},
      {id:4,name:'王姐',phone:'13800138003',dept:'产品运营部',role:'UI设计师',online:false,avatar:''},
      {id:5,name:'陈雪',phone:'13800138004',dept:'技术研发部',role:'前端工程师',online:true,avatar:''},
      {id:6,name:'林总',phone:'13800138005',dept:'管理层',role:'总经理',online:false,avatar:''},
      {id:7,name:'小李',phone:'13800138006',dept:'市场部',role:'市场专员',online:true,avatar:''},
      {id:8,name:'赵姐',phone:'13800138007',dept:'行政部',role:'行政主管',online:false,avatar:''},
    ];
    DB.tasks=[
      {id:1,title:'完成彩虹桥APP v1.0 PRD文档',done:false,priority:'紧急',time:'今天 14:00'},
      {id:2,title:'Q2季度OKR对齐会议',done:false,priority:'重要',time:'今天 16:00'},
      {id:3,title:'用户反馈收集与分析',done:true,priority:'普通',time:'明天 10:00'},
      {id:4,title:'竞品调研报告提交',done:false,priority:'重要',time:'明天 18:00'},
      {id:5,title:'技术方案评审',done:false,priority:'重要',time:'明天 10:00'},
    ];
    DB.chats=[
      {id:1,name:'产品一部群',type:'group',members:['陈默','张伟','刘芳','王姐'],msgs:[{from:'张伟',text:'彩虹桥APP测试报告已出',time:'09:20',mine:false},{from:'王姐',text:'收到，马上去处理！',time:'09:22',mine:false}],lastMsg:'收到，马上去处理！',time:'09:22',badge:0,online:true},
      {id:2,name:'张伟',type:'person',phone:'13800138001',msgs:[{from:'张伟',text:'那个需求我确认一下',time:'10:30',mine:false},{from:'我',text:'好的，等你',time:'10:35',mine:true}],lastMsg:'好的，等你',time:'10:35',badge:2,online:true},
      {id:3,name:'技术部群',type:'group',members:['张伟','陈雪','小李'],msgs:[{from:'陈雪',text:'服务器升级公告',time:'昨天',mine:false}],lastMsg:'服务器升级公告',time:'昨天',badge:0,online:false},
      {id:4,name:'刘芳',type:'person',phone:'13800138002',msgs:[{from:'刘芳',text:'好的，明天见~',time:'昨天',mine:false}],lastMsg:'好的，明天见~',time:'昨天',badge:0,online:true},
      {id:5,name:'项目协作群',type:'group',members:['林总','陈默','刘芳','张伟'],msgs:[{from:'林总',text:'本周五截止',time:'周一',mine:false}],lastMsg:'本周五截止',time:'周一',badge:5,online:false},
    ];
    DB.accounts=[
      {id:1,cat:'🍔',note:'午餐',amount:-28.5,type:'out',date:'今天'},
      {id:2,cat:'🚊',note:'地铁',amount:-4,type:'out',date:'今天'},
      {id:3,cat:'💰',note:'项目奖金',amount:8000,type:'in',date:'昨天'},
      {id:4,cat:'☕',note:'咖啡',amount:-32,type:'out',date:'昨天'},
      {id:5,cat:'🛒',note:'日用品',amount:-156.8,type:'out',date:'周一'},
      {id:6,cat:'🍜',note:'晚餐',amount:-45,type:'out',date:'周一'},
    ];
    DB.meetings=[
      {id:1,title:'彩虹桥APP产品评审会',time:'今天 14:00-15:30',people:['陈默','张伟','王姐','林总'],desc:'v1.0功能评审，确认上线计划'},
      {id:2,title:'Q2 OKR对齐会议',time:'今天 16:00-17:00',people:['陈默','刘芳','陈雪'],desc:'各成员OKR目标对齐'},
      {id:3,title:'技术方案评审',time:'明天 10:00-11:30',people:['张伟','陈雪','技术部'],desc:'后台架构升级方案评审'},
    ];
    DB.albums=[
      {id:1,emoji:'🏔',color:'#e3f2fd'},{id:2,emoji:'🌅',color:'#f3e5f5'},{id:3,emoji:'🌊',color:'#fff3e0'},
      {id:4,emoji:'🌸',color:'#e8f5e9'},{id:5,emoji:'🌿',color:'#e0f7fa'},{id:6,emoji:'🏙',color:'#ede7f6'},
      {id:7,emoji:'🌙',color:'#e8faf0'},{id:8,emoji:'🌈',color:'#fef9e7'},{id:9,emoji:'☁️',color:'#f5f5f5'},
      {id:10,emoji:'🌺',color:'#fce4ec'},{id:11,emoji:'🍀',color:'#e8f5e9'},{id:12,emoji:'🌻',color:'#fff8e1'},
    ];
    ['tasks','chats','members','accounts','meetings','albums'].forEach(save);
    save('user');
  }

  var currentChat=null;
  var $APP,$LOGIN;

  function $(s){return document.querySelector(s);}
  function $$(s){return document.querySelectorAll(s);}
  function el(id){return document.getElementById(id);}

  // ===== AUTH =====
  function login(){
    var name=el('loginUser').value.trim();
    var pwd=el('loginPwd').value;
    if(!name||!pwd){alert('请输入用户名和密码');return;}
    // Demo: any login works
    var user={name:name,phone:'13800138000',dept:'产品运营部',role:'产品经理',avatar:''};
    localStorage.setItem('rb2_user',JSON.stringify(user));
    DB.user=user;
    showApp();
  }

  function register(){
    var name=el('regUser').value.trim();
    var phone=el('regPhone').value.trim();
    var pwd=el('regPwd').value;
    if(!name||!phone||!pwd){alert('请填写完整信息');return;}
    var user={name:name,phone:phone,dept:'新成员',role:'成员',avatar:''};
    localStorage.setItem('rb2_user',JSON.stringify(user));
    DB.user=user;
    showApp();
  }

  function logout(){
    if(!confirm('确定退出登录？'))return;
    localStorage.removeItem('rb2_user');
    location.reload();
  }

  function showApp(){
    $LOGIN.classList.add('hide');
    $APP.classList.add('show');
    renderHome();
    fetchWeather();
  }

  function switchTab(tab){
    $$('.tab').forEach(function(t){t.classList.remove('active');});
    if(tab==='login'){$$('.tab')[0].classList.add('active');el('loginPanel').classList.add('active');el('registerPanel').classList.remove('active');}
    else{$$('.tab')[1].classList.add('active');el('loginPanel').classList.remove('active');el('registerPanel').classList.add('active');}
  }

  // ===== NAVIGATION =====
  var currentPage='home';
  function goto(page){
    currentPage=page;
    $$('.page').forEach(function(p){p.classList.remove('active');});
    $$('.tab-item').forEach(function(t){t.classList.remove('active');});
    var map={home:'homePage',chat:'chatPage',contacts:'contactsPage',tasks:'tasksPage',
             finance:'financePage',meetings:'meetingsPage',album:'albumPage',org:'orgPage',
             weather:'weatherPage',profile:'profilePage',work:'tasksPage'};
    var el2=el(map[page]||page+'Page');
    if(el2){el2.classList.add('active');el2.style.display='block';}
    // Update tab bar
    var tabMap={home:0,chat:1,work:2,contacts:3,profile:4};
    if(tabMap[page]!==undefined){
      var tabs=$$('.tab-item');
      if(tabs[tabMap[page]])tabs[tabMap[page]].classList.add('active');
    }
    // Render content
    if(page==='home')renderHome();
    else if(page==='chat')renderChatList();
    else if(page==='contacts')renderContacts();
    else if(page==='tasks')renderTasks();
    else if(page==='finance')renderFinance();
    else if(page==='meetings')renderMeetings();
    else if(page==='album')renderAlbum();
    else if(page==='org')renderOrg();
    else if(page==='weather')fetchWeather();
    else if(page==='profile')renderProfile();
  }

  // ===== HOME =====
  function renderHome(){
    var h=new Date().getHours();
    var greet=h<12?'早上好':h<18?'下午好':'晚上好';
    el('homeUsername').textContent=(DB.user?DB.user.name:'用户')+' 👋';
    el('homeUsername').previousElementSibling.textContent=greet;
    // Tasks preview
    var tasks=DB.tasks.filter(function(t){return !t.done;}).slice(0,3);
    var th='';
    tasks.forEach(function(t){
      th+='<div class="task-item"><div class="task-check" onclick="event.stopPropagation();app.toggleTask('+t.id+')"></div>'
        +'<div class="task-content"><div class="task-title">'+t.title+'</div>'
        +'<div class="task-meta">'+t.time+'</div></div></div>';
    });
    el('homeTasks').innerHTML=th||'<div style="color:#999;text-align:center;padding:12px">暂无待办任务 🎉</div>';
    // Chats preview
    var ch='';
    DB.chats.slice(0,3).forEach(function(c){
      ch+='<div class="chat-item" onclick="app.goto(\'chat\');app.openChat('+c.id+')">'
        +'<div class="chat-avatar">'+(c.type==='group'?'👥':'👤')+'</div>'
        +'<div class="chat-info"><div class="chat-name">'+c.name+'</div><div class="chat-msg">'+c.lastMsg+'</div></div>'
        +'<div><div class="chat-time">'+c.time+'</div>'
        +(c.badge>0?'<div class="chat-badge">'+c.badge+'</div>':'')+'</div></div>';
    });
    el('homeChats').innerHTML=ch||'<div style="color:#999;text-align:center;padding:12px">暂无消息</div>';
  }

  // ===== CHAT =====
  function renderChatList(){
    var h='';
    DB.chats.forEach(function(c){
      h+='<div class="chat-item" onclick="app.openChat('+c.id+')">'
        +'<div class="chat-avatar">'+(c.type==='group'?'👥':'👤')+'</div>'
        +'<div class="chat-info"><div class="chat-name">'+c.name+'</div><div class="chat-msg">'+c.lastMsg+'</div></div>'
        +'<div><div class="chat-time">'+c.time+'</div>'
        +(c.badge>0?'<div class="chat-badge">'+c.badge+'</div>':'')+'</div></div>';
    });
    el('chatList').innerHTML=h||'<div style="text-align:center;color:#999;padding:32px">暂无聊天记录</div>';
    // Badge
    var total=DB.chats.reduce(function(s,c){return s+(c.badge||0);},0);
    var badge=el('msgBadge');
    if(badge){badge.textContent=total;badge.classList[total>0?'remove':'add']('hidden');}
  }

  function openChat(id){
    currentChat=DB.chats.find(function(c){return c.id===id;});
    if(!currentChat)return;
    currentChat.badge=0;save('chats');
    $$('.page').forEach(function(p){p.classList.remove('active');});
    el('chatDetailPage').style.display='flex';
    el('chatDetailPage').classList.add('active');
    renderChatMsgs();
    renderChatList();
  }

  function renderChatMsgs(){
    if(!currentChat)return;
    var h='';
    (currentChat.msgs||[]).forEach(function(m){
      h+='<div class="msg '+(m.mine?'mine':'')+'">'
        +'<div class="msg-bubble">'+(m.img?'<img src="'+m.img+'" style="max-width:200px;border-radius:8px">':escHtml(m.text))+'</div>'
        +'<div style="font-size:11px;color:#999;margin-top:4px">'+(m.time||'')+'</div></div>';
    });
    var msgsEl=el('chatMessages');
    msgsEl.innerHTML=h;
    msgsEl.scrollTop=msgsEl.scrollHeight;
  }

  function sendMsg(){
    var input=el('msgInput');
    if(!input||!currentChat)return;
    var text=input.value.trim();
    if(!text)return;
    if(!currentChat.msgs)currentChat.msgs=[];
    currentChat.msgs.push({from:'我',text:text,time:now(),mine:true});
    currentChat.lastMsg=text;
    currentChat.time=now();
    save('chats');
    input.value='';
    renderChatMsgs();
    renderChatList();
    // Reply
    var replies=['好的，收到！','了解~','👍没问题','稍等','好的'];
    setTimeout(function(){
      var reply=replies[Math.floor(Math.random()*replies.length)];
      currentChat.msgs.push({from:currentChat.name,text:reply,time:now(),mine:false});
      currentChat.lastMsg=reply;
      currentChat.time=now();
      save('chats');
      renderChatMsgs();
    },800+Math.random()*1200);
  }

  function sendImage(){
    var url=prompt('输入图片URL地址：');
    if(!url)return;
    if(!currentChat.msgs)currentChat.msgs=[];
    currentChat.msgs.push({from:'我',img:url,time:now(),mine:true});
    currentChat.lastMsg='[图片]';
    currentChat.time=now();
    save('chats');
    renderChatMsgs();
    renderChatList();
  }

  // ===== CONTACTS =====
  function renderContacts(){
    var depts={};
    DB.members.forEach(function(m){
      if(!depts[m.dept])depts[m.dept]=[];
      depts[m.dept].push(m);
    });
    var h='';
    Object.keys(depts).sort().forEach(function(dept){
      var ms=depts[dept];
      h+='<div class="contact-group" id="dept-'+dept.replace(/\s/g,'')+'">'
        +'<div class="contact-header" onclick="app.toggleDept(\''+dept.replace(/\s/g,'')+'\')">'+dept+' ('+ms.length+') 人 ▼</div>'
        +'<div class="contact-list">';
      ms.forEach(function(m){
        h+='<div class="contact-item" onclick="app.chatWith(\''+m.name+'\')">'
          +'<div class="contact-avatar">👤</div>'
          +'<div class="contact-name">'+m.name+'<span style="font-size:12px;color:#999;margin-left:8px">'+m.role+'</span></div>'
          +'<div class="contact-status" style="background:'+(m.online?'#52c41a':'#ddd')+'"></div></div>';
      });
      h+='</div></div>';
    });
    el('contactsList').innerHTML=h||'<div style="text-align:center;color:#999;padding:32px">暂无通讯录</div>';
  }

  function toggleDept(id){
    var el2=document.getElementById('dept-'+id);
    if(!el2)return;
    var list=el2.querySelector('.contact-list');
    if(!list)return;
    var open=list.style.display!=='none';
    list.style.display=open?'none':'block';
    el2.querySelector('.contact-header').innerHTML=dept+(open?'':'')+' ▲';
  }

  function chatWith(name){
    var c=DB.chats.find(function(x){return x.name===name;});
    if(!c){
      var m=DB.members.find(function(x){return x.name===name;});
      c={id:Date.now(),name:name,type:'person',phone:m?m.phone:'',msgs:[{from:name,text:'你好！',time:now(),mine:false}],lastMsg:'你好！',time:now(),badge:0,online:m?m.online:false};
      DB.chats.unshift(c);save('chats');
    }
    goto('chat');
    openChat(c.id);
  }

  // ===== TASKS =====
  function renderTasks(){
    var h='';
    DB.tasks.forEach(function(t){
      var pc=t.priority==='紧急'?'#ff4d4f':t.priority==='重要'?'#faad14':'#52c41a';
      h+='<div class="task-item"><div class="task-check '+(t.done?'done':'')+'" onclick="app.toggleTask('+t.id+')">'+(t.done?'✓':'')+'</div>'
        +'<div class="task-content"><div class="task-title" style="text-decoration:'+(t.done?'line-through':'')+';color:'+(t.done?'#999':'')+'">'+t.title+'</div>'
        +'<div class="task-meta">'+t.time+' · <span class="task-priority" style="background:'+pc+'">'+t.priority+'</span></div></div></div>';
    });
    el('tasksList').innerHTML=h||'<div style="text-align:center;color:#999;padding:24px">暂无任务 🎉</div>';
  }

  function toggleTask(id){
    var t=DB.tasks.find(function(x){return x.id===id;});
    if(t){t.done=!t.done;save('tasks');renderTasks();renderHome();}
  }

  function addTask(){
    var title=prompt('任务标题：');
    if(!title)return;
    DB.tasks.unshift({id:Date.now(),title:title,done:false,priority:'普通',time:'待安排'});
    save('tasks');renderTasks();renderHome();
  }

  // ===== FINANCE =====
  function renderFinance(){
    var inc=0,out=0;
    DB.accounts.forEach(function(a){if(a.type==='in')inc+=a.amount;else out+=a.amount;});
    var bal=inc+out;
    el('financeBalance').textContent='¥'+(bal>=0?'+':'')+bal.toFixed(2);
    el('financeIn').textContent='+¥'+inc.toFixed(0);
    el('financeOut').textContent='-¥'+Math.abs(out).toFixed(0);
    var h='';
    DB.accounts.forEach(function(a){
      h+='<div class="task-item"><div style="font-size:24px;margin-right:12px">'+a.cat+'</div>'
        +'<div class="task-content"><div class="task-title">'+a.note+'</div><div class="task-meta">'+a.date+'</div></div>'
        +'<div style="font-size:16px;font-weight:700;color:'+(a.type==='in'?'#52c41a':'#ff4d4f')+'">'
        +(a.type==='in'?'+':'—')+'¥'+Math.abs(a.amount).toFixed(2)+'</div></div>';
    });
    el('financeList').innerHTML=h||'<div style="text-align:center;color:#999;padding:24px">暂无记录</div>';
  }

  function addFinance(){
    var note=prompt('记录说明（如：午餐）：');
    if(!note)return;
    var amount=prompt('金额（如：-28.5 或 500）：');
    if(!amount)return;
    var n=parseFloat(amount);
    DB.accounts.unshift({id:Date.now(),cat:getEmoji(note),note:note,amount:n,type:n>=0?'in':'out',date:now()});
    save('accounts');renderFinance();
  }

  function getEmoji(note){
    var map={午餐:'🍔',晚餐:'🍜',咖啡:'☕',地铁:'🚊',奖金:'💰',购物:'🛒',工资:'💵',交通:'🚗',娱乐:'🎮',水果:'🍎'};
    for(var k in map){if(note.includes(k))return map[k];}
    return '📝';
  }

  // ===== MEETINGS =====
  function renderMeetings(){
    var h='';
    DB.meetings.forEach(function(m){
      h+='<div class="card"><div style="font-size:16px;font-weight:600">📅 '+m.title+'</div>'
        +'<div style="font-size:13px;color:#666;margin-top:4px">🕐 '+m.time+'</div>'
        +'<div style="font-size:13px;color:#999;margin-top:4px">👥 '+m.people.join('、')+'</div>'
        +'<div style="font-size:13px;color:#666;margin-top:6px;padding-top:6px;border-top:1px solid #eee">'+m.desc+'</div></div>';
    });
    el('meetingsList').innerHTML=h||'<div style="text-align:center;color:#999;padding:24px">暂无会议</div>';
  }

  function addMeeting(){
    var title=prompt('会议主题：');
    if(!title)return;
    var time=prompt('会议时间（如：明天 14:00-15:00）：')||'待安排';
    var desc=prompt('会议描述：')||'';
    var people=prompt('参与人（用中文顿号分隔）：')||'全体成员';
    DB.meetings.unshift({id:Date.now(),title:title,time:time,people:people.split('、'),desc:desc});
    save('meetings');renderMeetings();
  }

  // ===== ALBUM =====
  function renderAlbum(){
    var colors=['#e3f2fd','#f3e5f5','#fff3e0','#e8f5e9','#fce4ec','#e0f7fa','#ede7f6','#e8faf0','#fef9e7','#fce4ec','#e8f5e9','#fff8e1'];
    var emojis=['🏔','🌅','🌊','🌸','🌿','🏙','🌙','🌈','☁️','🌺','🍀','🌻'];
    var h='';
    for(var i=0;i<12;i++){
      var a=DB.albums[i]||{emoji:emojis[i],color:colors[i]};
      h+='<div class="grid-item" style="background:'+a.color+';aspect-ratio:1;border-radius:8px;font-size:36px">'+a.emoji+'</div>';
    }
    el('albumGrid').innerHTML=h;
  }

  // ===== ORG =====
  function renderOrg(){
    // Build simple tree from members
    var depts={};
    DB.members.forEach(function(m){
      if(!depts[m.dept])depts[m.dept]=[];
      depts[m.dept].push(m);
    });
    var h='<div class="card" style="text-align:center;padding:24px">'
      +'<div style="font-size:48px;margin-bottom:8px">🏢</div>'
      +'<div style="font-size:18px;font-weight:700">彩虹桥科技</div>'
      +'<div style="font-size:13px;color:#999;margin-top:4px">组织架构</div></div>';
    Object.keys(depts).sort().forEach(function(dept){
      var ms=depts[dept];
      h+='<div class="card"><div style="font-size:14px;font-weight:600;margin-bottom:8px">📁 '+dept+' ('+ms.length+'人)</div>';
      ms.forEach(function(m){
        h+='<div style="display:flex;align-items:center;padding:8px 0;border-bottom:1px solid #f5f5f5">'
          +'<div style="width:36px;height:36px;border-radius:50%;background:#e3f2fd;display:flex;align-items:center;justify-content:center;margin-right:10px;font-size:18px">👤</div>'
          +'<div style="flex:1"><div style="font-size:14px;font-weight:500">'+m.name+'</div>'
          +'<div style="font-size:12px;color:#999">'+m.role+' <span style="color:'+(m.online?'#52c41a':'#999')+'">'+(m.online?'● 在线':'○ 离线')+'</span></div></div></div>';
      });
      h+='</div>';
    });
    el('orgTree').innerHTML=h;
  }

  // ===== WEATHER =====
  function fetchWeather(){
    var icons={113:'☀️',116:'⛅',119:'☁️',122:'☁️',176:'🌦',200:'⛈',263:'🌧',293:'🌧',296:'🌧',353:'🌧'};
    var descs={113:'晴朗',116:'多云',119:'阴天',122:'阴天',176:'阵雨',200:'雷暴',263:'小雨',293:'小雨',296:'中雨',353:'阵雨'};
    fetch('https://wttr.in/haikou?format=j1&lang=zh').then(function(r){return r.json();})
      .then(function(d){
        var c=d.current_condition[0];
        var code=parseInt(c.weatherCode);
        var icon=icons[code]||'⛅';
        var desc=descs[code]||'多云';
        el('weatherIcon').textContent=icon;
        el('weatherTemp').textContent=c.temp_C+'°C';
        el('weatherDesc').textContent=desc;
        el('weatherHum').textContent=c.humidity+'%';
        el('weatherWind').textContent=c.windspeedKmph+'km/h';
      })
      .catch(function(){
        el('weatherTemp').textContent='26°C';
        el('weatherDesc').textContent='晴转多云';
      });
  }

  // ===== PROFILE =====
  function renderProfile(){
    if(!DB.user)return;
    el('profileName').textContent=DB.user.name;
    el('profileRole').textContent=(DB.user.dept||'')+' · '+(DB.user.role||'');
    var total=DB.tasks.length;
    var done=DB.tasks.filter(function(t){return t.done;}).length;
    var unread=DB.chats.reduce(function(s,c){return s+(c.badge||0);},0);
    el('statTasks').textContent=total;
    el('statDone').textContent=done;
    el('statMsg').textContent=unread;
  }

  // ===== UTILS =====
  function now(){
    var d=new Date();
    return d.getHours().toString().padStart(2,'0')+':'+d.getMinutes().toString().padStart(2,'0');
  }
  function escHtml(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}

  // ===== INIT =====
  function init(){
    $LOGIN=el('login');
    $APP=el('app');
    ['tasks','chats','members','accounts','meetings','albums'].forEach(load);
    var saved=localStorage.getItem('rb2_user');
    if(saved){try{DB.user=JSON.parse(saved);}catch(e){}}
    if(!localStorage.getItem('rb2_inited')){initData();localStorage.setItem('rb2_inited','1');}
    if(DB.user){showApp();renderChatList();}
    // Enter key
    el('msgInput')&&el('msgInput').addEventListener('keydown',function(e){if(e.key==='Enter')sendMsg();});
    el('loginPwd')&&el('loginPwd').addEventListener('keydown',function(e){if(e.key==='Enter')login();});
  }

  window.app={
    login:login,register:register,logout:logout,switchTab:switchTab,
    goto:goto,openChat:openChat,sendMsg:sendMsg,sendImage:sendImage,
    chatWith:chatWith,renderContacts:renderContacts,toggleDept:toggleDept,
    renderTasks:renderTasks,toggleTask:toggleTask,addTask:addTask,
    renderFinance:renderFinance,addFinance:addFinance,
    renderMeetings:renderMeetings,addMeeting:addMeeting,
    renderAlbum:renderAlbum,renderOrg:renderOrg,fetchWeather:fetchWeather,
    renderProfile:renderProfile
  };

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',init);
  } else {init();}
})();
