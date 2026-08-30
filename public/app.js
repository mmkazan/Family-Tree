(function(){
  "use strict";

  /* ================= i18n ================= */
  var STR = {
    en:{
      sub:"Family Tree", add:"Add person",
      viewTree:"Tree", viewMap:"Map",
      editLocked:"Unlock to edit", editUnlocked:"Editing",
      ehTitle:"Begin the family tree", ehText:"Add the first person — a grandparent, a parent, or yourself — then build outward from there.",
      ehAdd:"Add the first person",
      nameEn:"Name (English / Latin)", nameEl:"Name (Greek · Ελληνικά)",
      maiden:"Family name at birth (if changed)", born:"Born", died:"Died",
      place:"Birthplace", notes:"Notes",
      placeholderEn:"e.g. Georgios Kazantzis", placeholderEl:"π.χ. Γεώργιος Καζαντζής",
      relations:"Relatives", addParent:"＋ Parent", addPartner:"＋ Partner", addChild:"＋ Child", addSibling:"＋ Sibling",
      del:"Remove", save:"Save", newPerson:"New person",
      addPhoto:"Add photo", removePhoto:"Remove photo", photoErr:"Sorry — couldn't read that image.",
      mediaLinks:"Audio & video links", addMediaLink:"＋ Add a link",
      kAudio:"Audio", kVideo:"Video", kLink:"Link", mLabel:"Label (optional)",
      listen:"Listen", watch:"Watch", open:"Open",
      places:"Life locations", addPlace:"＋ Add a place", findPlace:"Find", placeName:"Place name", yearShort:"Year",
      coordSet:"Pinned on the map", coordNone:"Type a place, then Find to pin it",
      showPerson:"Show", allPeople:"Everyone", lifeEvents:"Life events",
      tBorn:"Born", tRaised:"Raised", tEducated:"Educated", tWorked:"Worked", tLived:"Lived", tDied:"Died", tOther:"Other",
      readonly:"Viewing only — unlock with the family password to add or edit.",
      pcTitle:"Family edit access", pcLede:"Enter the family password to add and edit people.",
      pcPlaceholder:"Family password", pcOk:"Unlock", pcCancel:"Cancel", pcWrong:"That password didn't match. Try again.",
      saving:"Saving…", saved:"Saved", offline:"Not saved", conflictReload:"Someone else updated the tree — loaded the latest.",
      helpTitle:"Building your family tree", helpLede:"A shared, bilingual tree the whole family can grow together.",
      steps:[
        "<b>Unlock to edit.</b> Anyone can view the tree. To add or change people, press <b>Unlock to edit</b> and enter the family password.",
        "<b>Add people.</b> Click any card, then use ＋ Parent, ＋ Partner, ＋ Child or ＋ Sibling to add relatives around them.",
        "<b>Two languages.</b> Every person has a Greek name and a Latin/English name. Use the <b>ΕΛ / EN</b> switch to read the whole tree either way.",
        "<b>Photos, clips &amp; places.</b> Open a person to add a photo, links to audio or video, and life locations — born, raised, lived, and more.",
        "<b>Map view.</b> Switch to <b>Map</b> to see where the family was born, lived and worked, pinned across Greece and beyond.",
        "<b>It saves for everyone.</b> Changes save automatically, so anyone with the link sees the latest tree."
      ],
      note:"Share the link with anyone to let them view the tree. Give the family password only to relatives you want to be able to add and edit people."
    },
    el:{
      sub:"Οικογενειακό Δέντρο", add:"Προσθήκη ατόμου",
      viewTree:"Δέντρο", viewMap:"Χάρτης",
      editLocked:"Ξεκλείδωμα", editUnlocked:"Επεξεργασία",
      ehTitle:"Ξεκινήστε το οικογενειακό δέντρο", ehText:"Προσθέστε το πρώτο άτομο — έναν παππού, έναν γονέα ή εσάς — και χτίστε από εκεί.",
      ehAdd:"Προσθέστε το πρώτο άτομο",
      nameEn:"Όνομα (Λατινικά · English)", nameEl:"Όνομα (Ελληνικά)",
      maiden:"Πατρικό όνομα / γένος (αν άλλαξε)", born:"Γεννήθηκε", died:"Απεβίωσε",
      place:"Τόπος γέννησης", notes:"Σημειώσεις",
      placeholderEn:"π.χ. Georgios Kazantzis", placeholderEl:"π.χ. Γεώργιος Καζαντζής",
      relations:"Συγγενείς", addParent:"＋ Γονέας", addPartner:"＋ Σύζυγος", addChild:"＋ Παιδί", addSibling:"＋ Αδέλφι",
      del:"Διαγραφή", save:"Αποθήκευση", newPerson:"Νέο άτομο",
      addPhoto:"Προσθήκη φωτογραφίας", removePhoto:"Αφαίρεση φωτογραφίας", photoErr:"Δεν ήταν δυνατή η ανάγνωση της εικόνας.",
      mediaLinks:"Σύνδεσμοι ήχου & βίντεο", addMediaLink:"＋ Προσθήκη συνδέσμου",
      kAudio:"Ήχος", kVideo:"Βίντεο", kLink:"Σύνδεσμος", mLabel:"Ετικέτα (προαιρετικά)",
      listen:"Ακρόαση", watch:"Παρακολούθηση", open:"Άνοιγμα",
      places:"Τόποι ζωής", addPlace:"＋ Προσθήκη τόπου", findPlace:"Εύρεση", placeName:"Όνομα τόπου", yearShort:"Έτος",
      coordSet:"Καρφιτσωμένο στον χάρτη", coordNone:"Γράψτε τόπο και πατήστε Εύρεση",
      showPerson:"Προβολή", allPeople:"Όλοι", lifeEvents:"Γεγονότα ζωής",
      tBorn:"Γέννηση", tRaised:"Μεγάλωσε", tEducated:"Σπούδασε", tWorked:"Εργάστηκε", tLived:"Έζησε", tDied:"Θάνατος", tOther:"Άλλο",
      readonly:"Μόνο προβολή — ξεκλειδώστε με τον οικογενειακό κωδικό για επεξεργασία.",
      pcTitle:"Πρόσβαση επεξεργασίας", pcLede:"Εισάγετε τον οικογενειακό κωδικό για να προσθέσετε ή να επεξεργαστείτε άτομα.",
      pcPlaceholder:"Οικογενειακός κωδικός", pcOk:"Ξεκλείδωμα", pcCancel:"Άκυρο", pcWrong:"Λάθος κωδικός. Δοκιμάστε ξανά.",
      saving:"Αποθήκευση…", saved:"Αποθηκεύτηκε", offline:"Δεν αποθηκεύτηκε", conflictReload:"Κάποιος άλλος ενημέρωσε το δέντρο — φορτώθηκε το πιο πρόσφατο.",
      helpTitle:"Δημιουργία του οικογενειακού δέντρου", helpLede:"Ένα κοινό, δίγλωσσο δέντρο που όλη η οικογένεια χτίζει μαζί.",
      steps:[
        "<b>Ξεκλείδωμα.</b> Όλοι μπορούν να δουν το δέντρο. Για επεξεργασία, πατήστε <b>Ξεκλείδωμα</b> και βάλτε τον οικογενειακό κωδικό.",
        "<b>Προσθέστε άτομα.</b> Κάντε κλικ σε μια κάρτα και χρησιμοποιήστε ＋ Γονέας, ＋ Σύζυγος, ＋ Παιδί ή ＋ Αδέλφι.",
        "<b>Δύο γλώσσες.</b> Κάθε άτομο έχει ελληνικό και λατινικό όνομα. Χρησιμοποιήστε τον διακόπτη <b>ΕΛ / EN</b>.",
        "<b>Φωτογραφίες, κλιπ & τόποι.</b> Ανοίξτε ένα άτομο για φωτογραφία, συνδέσμους ήχου/βίντεο και τόπους ζωής — γέννηση, διαμονή κ.ά.",
        "<b>Προβολή χάρτη.</b> Πατήστε <b>Χάρτης</b> για να δείτε πού γεννήθηκε, έζησε και εργάστηκε η οικογένεια.",
        "<b>Αποθηκεύεται για όλους.</b> Οι αλλαγές αποθηκεύονται αυτόματα, ώστε όλοι να βλέπουν το πιο πρόσφατο δέντρο."
      ],
      note:"Μοιραστείτε τον σύνδεσμο για προβολή. Δώστε τον κωδικό μόνο σε όσους θέλετε να μπορούν να επεξεργάζονται."
    }
  };
  var PLACE_TYPES = ["born","raised","educated","worked","lived","died","other"];
  function typeLabel(t){ return T({born:"tBorn",raised:"tRaised",educated:"tEducated",worked:"tWorked",lived:"tLived",died:"tDied",other:"tOther"}[t]||"tOther"); }
  function typeColor(t){
    var v = getComputedStyle(document.documentElement).getPropertyValue("--"+t);
    return (v && v.trim()) || "#8a9599";
  }

  /* ================= State ================= */
  var state = { title:{en:"Kazantzis",el:"Καζαντζής"}, people:{}, version:0 };
  var lang = "en", selectedId = null, editingId = null, editMode = false;
  var passcode = "";
  var tx = {x:60,y:40,k:1};
  var hiddenTypes = {};

  try{ var s=JSON.parse(sessionStorage.getItem("kz_ui")||"null"); if(s){ if(s.lang)lang=s.lang; if(s.tx)tx=s.tx; } }catch(e){}
  try{ passcode = localStorage.getItem("kz_pass")||""; }catch(e){}

  function saveUI(){ try{ sessionStorage.setItem("kz_ui",JSON.stringify({lang:lang,tx:tx})); }catch(e){} }
  function T(k){ return STR[lang][k]; }
  function uid(){ return "p_"+Date.now().toString(36)+Math.floor(Math.random()*46656).toString(36); }
  function isNum(n){ return typeof n==="number" && isFinite(n); }
  function esc(s){ return (s||"").replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];}); }

  function newPerson(extra){
    var o={id:uid(),nameEn:"",nameEl:"",maiden:"",birth:"",death:"",place:"",notes:"",photo:"",media:[],places:[],parents:[],partner:null};
    if(extra){ for(var k in extra) o[k]=extra[k]; }
    return o;
  }

  var ICON = {
    audio:'<svg viewBox="0 0 24 24" fill="none"><path d="M9 17V6l10-2v9" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><circle cx="6.5" cy="17.5" r="2.4" stroke="currentColor" stroke-width="1.7"/><circle cx="16.5" cy="15.5" r="2.4" stroke="currentColor" stroke-width="1.7"/></svg>',
    video:'<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="13" height="12" rx="2.2" stroke="currentColor" stroke-width="1.7"/><path d="M16 10.2l5-2.7v9l-5-2.7" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
    link:'<svg viewBox="0 0 24 24" fill="none"><path d="M10.5 13.5a3.5 3.5 0 004.9.1l2.6-2.6a3.5 3.5 0 00-4.9-4.9l-1 .9M13.5 10.5a3.5 3.5 0 00-4.9-.1l-2.6 2.6a3.5 3.5 0 004.9 4.9l1-.9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>'
  };

  var $ = function(id){ return document.getElementById(id); };
  function P(id){ return state.people[id]; }
  function persons(){ return Object.keys(state.people).map(function(k){return state.people[k];}); }

  function nameFor(p, l){
    var a=l==="el"?p.nameEl:p.nameEn, b=l==="el"?p.nameEn:p.nameEl;
    return {primary:(a||"").trim(), secondary:(b||"").trim()};
  }
  function initialOf(p){ var nm=nameFor(p,lang); var s=(nm.primary||nm.secondary||"").trim(); return s?s.charAt(0).toUpperCase():"•"; }
  function yearsFor(p){ var b=(p.birth||"").trim(), d=(p.death||"").trim(); if(!b&&!d) return {txt:"",dec:false}; return {txt:b+"–"+d, dec:!!d}; }

  function downscale(file, cb){
    var rd=new FileReader();
    rd.onload=function(){ var img=new Image();
      img.onload=function(){ var max=480,w=img.width,h=img.height,s=Math.min(1,max/Math.max(w,h));
        w=Math.max(1,Math.round(w*s));h=Math.max(1,Math.round(h*s));
        var c=document.createElement("canvas");c.width=w;c.height=h;c.getContext("2d").drawImage(img,0,0,w,h);
        try{ cb(c.toDataURL("image/jpeg",0.72)); }catch(e){ cb(null); } };
      img.onerror=function(){cb(null);}; img.src=rd.result; };
    rd.onerror=function(){cb(null);}; rd.readAsDataURL(file);
  }

  /* ================= Layout ================= */
  var U=210, CH=106, COUPLE_GAP=28, SIB_GAP=42, GEN_GAP=62, PAD=40;
  function unitWidth(u){ return u.members.length===2 ? U*2+COUPLE_GAP : U; }
  function buildUnits(){
    var ps=persons(), visited={}, units=[], unitOf={};
    ps.forEach(function(p){ if(visited[p.id])return;
      var members = (p.partner && P(p.partner) && !visited[p.partner]) ? [p.id,p.partner] : [p.id];
      var u={id:"u_"+members.join("_"),members:members}; units.push(u);
      members.forEach(function(m){visited[m]=1;unitOf[m]=u;}); });
    units.forEach(function(u){ var ms={}; u.members.forEach(function(m){ms[m]=1;});
      u.childPersonIds = ps.filter(function(pp){return (pp.parents||[]).some(function(pid){return ms[pid];});}).map(function(pp){return pp.id;}); });
    return {units:units,unitOf:unitOf};
  }
  function childUnitsOf(u,unitOf){ var seen={},out=[]; (u.childPersonIds||[]).forEach(function(cid){var cu=unitOf[cid]; if(cu&&!seen[cu.id]){seen[cu.id]=1;out.push(cu);}}); return out; }
  function computeLayout(){
    var bu=buildUnits(), units=bu.units, unitOf=bu.unitOf, placed={};
    var roots=units.filter(function(u){return u.members.every(function(m){var par=P(m).parents||[];return !par.some(function(pid){return P(pid);});});});
    if(roots.length===0) roots=units.slice();
    function shiftTree(u,dx,done){ if(done[u.id])return; done[u.id]=1; u.x+=dx; childUnitsOf(u,unitOf).forEach(function(k){shiftTree(k,dx,done);}); }
    function place(u,left,depth){ if(placed[u.id])return 0; placed[u.id]=1; u.depth=depth;
      var kids=childUnitsOf(u,unitOf).filter(function(k){return !placed[k.id];}); var uw=unitWidth(u);
      if(kids.length===0){u.x=left;return uw;}
      var cursor=left; kids.forEach(function(k){var w=place(k,cursor,depth+1);cursor+=w+SIB_GAP;});
      var block=cursor-SIB_GAP-left;
      if(uw<=block){u.x=left+(block-uw)/2;return block;}
      var dx=(uw-block)/2; kids.forEach(function(k){shiftTree(k,dx,{});}); u.x=left; return uw; }
    var cursor=PAD; roots.forEach(function(r){var w=place(r,cursor,0);cursor+=w+SIB_GAP*1.6;});
    units.forEach(function(u){u.y=PAD+u.depth*(CH+GEN_GAP);});
    var maxX=0,maxY=0; units.forEach(function(u){maxX=Math.max(maxX,u.x+unitWidth(u));maxY=Math.max(maxY,u.y+CH);});
    return {units:units,unitOf:unitOf,w:maxX+PAD,h:maxY+PAD};
  }

  /* ================= Render tree ================= */
  var stage=$("stage"), wires=$("wires"), viewport=$("viewport"), emptyHero=$("emptyHero");
  function render(){
    var layout=computeLayout();
    Array.prototype.slice.call(stage.querySelectorAll(".card")).forEach(function(n){n.remove();});
    emptyHero.hidden = persons().length>0;
    stage.style.width=layout.w+"px"; stage.style.height=layout.h+"px";
    wires.setAttribute("width",layout.w); wires.setAttribute("height",layout.h); wires.setAttribute("viewBox","0 0 "+layout.w+" "+layout.h);
    var lines=[];
    layout.units.forEach(function(u){
      if(u.members.length===2){ var my=u.y+CH*0.5;
        lines.push('<line x1="'+(u.x+U)+'" y1="'+my+'" x2="'+(u.x+U+COUPLE_GAP)+'" y2="'+my+'" stroke="var(--line)" stroke-width="2.4"/>');
        lines.push('<circle cx="'+(u.x+U+COUPLE_GAP/2)+'" cy="'+my+'" r="3.1" fill="var(--brass)"/>'); }
      var kids=childUnitsOf(u,layout.unitOf).filter(function(k){return typeof k.x==="number"&&k.depth===u.depth+1;});
      if(kids.length){ var ms={}; u.members.forEach(function(m){ms[m]=1;});
        var px=u.x+unitWidth(u)/2, pB=u.y+CH, busY=pB+GEN_GAP*0.5;
        lines.push('<line x1="'+px+'" y1="'+pB+'" x2="'+px+'" y2="'+busY+'" stroke="var(--line)" stroke-width="1.7"/>');
        var xs=kids.map(function(k){ var cm=k.members.filter(function(m){return (P(m).parents||[]).some(function(pid){return ms[pid];});});
          var mid=cm.length?cm[0]:k.members[0]; var idx=k.members.indexOf(mid); return k.x+(idx===1?U+COUPLE_GAP+U/2:U/2); });
        var minx=Math.min.apply(null,xs.concat([px])), maxx=Math.max.apply(null,xs.concat([px]));
        if(maxx-minx>0.5) lines.push('<line x1="'+minx+'" y1="'+busY+'" x2="'+maxx+'" y2="'+busY+'" stroke="var(--line)" stroke-width="1.7"/>');
        xs.forEach(function(cx,i){ lines.push('<line x1="'+cx+'" y1="'+busY+'" x2="'+cx+'" y2="'+kids[i].y+'" stroke="var(--line)" stroke-width="1.7"/>'); });
      }
    });
    wires.innerHTML=lines.join("");
    layout.units.forEach(function(u){
      u.members.forEach(function(mid,i){
        var p=P(mid), cx=u.x+(i===1?U+COUPLE_GAP:0), nm=nameFor(p,lang), yr=yearsFor(p);
        var card=document.createElement("div"); card.className="card"+(mid===selectedId?" sel":"");
        card.style.left=cx+"px"; card.style.top=u.y+"px"; card.setAttribute("tabindex","0"); card.setAttribute("data-id",mid);
        var primaryHtml = nm.primary?'<div class="nm primary">'+esc(nm.primary)+'</div>'
          :(nm.secondary?'<div class="nm primary empty">'+esc(nm.secondary)+'</div>':'<div class="nm primary empty">'+esc(T("newPerson"))+'</div>');
        var secondaryHtml=(nm.primary&&nm.secondary)?'<div class="nm secondary">'+esc(nm.secondary)+'</div>':'';
        var status=(!yr.dec&&p.birth)?'<span class="status live"></span>':'';
        var header='<div class="chead"><div class="avatar'+(yr.dec?' dec':'')+'">'+(p.photo?"":esc(initialOf(p)))+'</div><div class="cmeta">'+primaryHtml+secondaryHtml+'</div></div>';
        var media=p.media||[]; var na=media.filter(function(m){return m.kind==="audio";}).length, nv=media.filter(function(m){return m.kind==="video";}).length;
        var np=(p.places||[]).filter(function(x){return isNum(x.lat)&&isNum(x.lng);}).length;
        var chips=[];
        if(na) chips.push('<span class="chip">'+ICON.audio+na+'</span>');
        if(nv) chips.push('<span class="chip">'+ICON.video+nv+'</span>');
        if(np) chips.push('<span class="chip pin" style="background:var(--brass)">'+pinSvg()+np+'</span>');
        var chipsHtml=chips.length?'<div class="chips">'+chips.join("")+'</div>':'';
        var yrsHtml=yr.txt?'<div class="yrs">'+(yr.dec?'<span class="dag">†</span>':'')+'<span>'+esc(yr.txt)+'</span></div>':'<div class="yrs"></div>';
        var foot=(yr.txt||chips.length)?'<div class="cfoot">'+yrsHtml+chipsHtml+'</div>':'';
        card.innerHTML=status+header+foot;
        if(p.photo){ var av=card.querySelector(".avatar"); if(av) av.style.backgroundImage='url("'+p.photo+'")'; }
        stage.appendChild(card);
      });
    });
    applyTransform();
  }
  function pinSvg(){ return '<svg viewBox="0 0 24 24" fill="none"><path d="M12 21s7-6.3 7-11a7 7 0 10-14 0c0 4.7 7 11 7 11z" stroke="#fff" stroke-width="2"/><circle cx="12" cy="10" r="2.3" fill="#fff"/></svg>'; }
  function applyTransform(){ stage.style.transform="translate("+tx.x+"px,"+tx.y+"px) scale("+tx.k+")"; }

  /* ================= Chrome ================= */
  function paintChrome(){
    document.documentElement.lang=lang;
    var fam=$("famTitle"), t=state.title, main=lang==="el"?t.el:t.en, alt=lang==="el"?t.en:t.el;
    fam.innerHTML=esc(main||"")+(alt&&alt!==main?'<span class="alt">'+esc(alt)+'</span>':'');
    $("subTitle").textContent=T("sub");
    $("addLbl").textContent=T("add");
    $("viewTreeLbl").textContent=T("viewTree"); $("viewMapLbl").textContent=T("viewMap");
    $("langEl").setAttribute("aria-pressed",lang==="el"); $("langEn").setAttribute("aria-pressed",lang==="en");
    $("ehTitle").textContent=T("ehTitle"); $("ehText").textContent=T("ehText"); $("ehAdd").textContent=T("ehAdd");
    $("roText").textContent=T("readonly"); $("delLbl").textContent=T("del"); $("saveBtn").textContent=T("save");
    $("editLbl").textContent=editMode?T("editUnlocked"):T("editLocked");
    $("mtPersonLbl").textContent=T("showPerson"); $("mtLegendLbl").textContent=T("lifeEvents");
  }

  /* ================= Mutations ================= */
  function addFirst(){ var np=newPerson(); state.people[np.id]=np; render(); openEditor(np.id,true); }
  function addChild(pid){ var p=P(pid); var parents=p.partner&&P(p.partner)?[pid,p.partner]:[pid]; var np=newPerson({parents:parents}); state.people[np.id]=np; render(); openEditor(np.id,true); }
  function addSibling(pid){ var p=P(pid); var np=newPerson({parents:(p.parents||[]).slice()}); state.people[np.id]=np; render(); openEditor(np.id,true); }
  function addPartner(pid){ var p=P(pid); if(p.partner&&P(p.partner)){openEditor(p.partner,false);return;} var np=newPerson({partner:pid}); state.people[np.id]=np; p.partner=np.id; render(); openEditor(np.id,true); }
  function addParent(pid){ var p=P(pid); var existing=(p.parents||[]).filter(function(x){return P(x);});
    if(existing.length>=2){openEditor(existing[0],false);return;}
    var np=newPerson(); var id=np.id; state.people[id]=np;
    if(existing.length===1){ var other=existing[0]; state.people[id].partner=other; P(other).partner=id; p.parents=[other,id]; }
    else { p.parents=[id]; }
    render(); openEditor(id,true); }
  function removePerson(pid){ delete state.people[pid];
    persons().forEach(function(pp){ if(pp.partner===pid)pp.partner=null; if(pp.parents)pp.parents=pp.parents.filter(function(x){return x!==pid;}); });
    selectedId=null; closeDrawer(); render(); scheduleSave(true); }

  /* ================= Editor ================= */
  var drawer=$("drawer"), scrim=$("scrim"), drawerBody=$("drawerBody");
  function fieldRow(label,id,val,cls,ph,textarea){
    var input=textarea?'<textarea id="'+id+'" class="'+(cls||"")+'">'+esc(val||"")+'</textarea>'
      :'<input id="'+id+'" class="'+(cls||"")+'" value="'+esc(val||"")+'"'+(ph?' placeholder="'+esc(ph)+'"':'')+' />';
    return '<div class="field"><label for="'+id+'">'+esc(label)+'</label>'+input+'</div>';
  }
  function mediaKindOptions(cur){ return ['video','audio','link'].map(function(k){var l=k==="video"?T("kVideo"):k==="audio"?T("kAudio"):T("kLink");return '<option value="'+k+'"'+(cur===k?" selected":"")+'>'+esc(l)+'</option>';}).join(""); }
  function mediaRowHtml(m){ return '<div class="media-row"><select class="m-kind">'+mediaKindOptions(m.kind||"video")+'</select>'+
    '<input class="m-label" placeholder="'+esc(T("mLabel"))+'" value="'+esc(m.label||"")+'" />'+
    '<button type="button" class="rm" title="'+esc(T("del"))+'">✕</button>'+
    '<input class="m-url" type="url" inputmode="url" placeholder="https://…" value="'+esc(m.url||"")+'" /></div>'; }
  function readMediaRows(keepEmpty){ var arr=[]; drawerBody.querySelectorAll(".media-row").forEach(function(r){
    var kind=r.querySelector(".m-kind").value, label=r.querySelector(".m-label").value.trim(), url=r.querySelector(".m-url").value.trim();
    if(url||keepEmpty) arr.push({kind:kind,label:label,url:url}); }); return arr; }
  function renderMediaRows(list){ var box=$("mediaRows"); if(!box)return; box.innerHTML=(list||[]).map(mediaRowHtml).join("");
    box.querySelectorAll(".rm").forEach(function(b){ b.addEventListener("click",function(){ var snap=readMediaRows(true);
      var rows=Array.prototype.slice.call(box.querySelectorAll(".media-row")); var idx=rows.indexOf(b.closest(".media-row")); if(idx>-1)snap.splice(idx,1); renderMediaRows(snap); }); }); }

  function placeTypeOptions(cur){ return PLACE_TYPES.map(function(k){return '<option value="'+k+'"'+(cur===k?" selected":"")+'>'+esc(typeLabel(k))+'</option>';}).join(""); }
  function placeRowHtml(pl){
    var hasCoord=isNum(pl.lat)&&isNum(pl.lng);
    return '<div class="place-row"'+(hasCoord?' data-lat="'+pl.lat+'" data-lng="'+pl.lng+'"':'')+'>'+
      '<div class="pr-top"><select class="pl-type">'+placeTypeOptions(pl.type||"lived")+'</select>'+
        '<input class="pl-year" inputmode="numeric" placeholder="'+esc(T("yearShort"))+'" value="'+esc(pl.year||"")+'" />'+
        '<button type="button" class="rm pl-rm" title="'+esc(T("del"))+'">✕</button></div>'+
      '<div class="pr-find"><input class="pl-label" placeholder="'+esc(T("placeName"))+'" value="'+esc(pl.label||"")+'" />'+
        '<button type="button" class="btn findbtn pl-find">'+esc(T("findPlace"))+'</button></div>'+
      '<div class="coordtag'+(hasCoord?' set':'')+'"><span class="ct-ic">'+(hasCoord?'📍':'○')+'</span><span class="ct-txt">'+esc(hasCoord?T("coordSet"):T("coordNone"))+'</span></div>'+
      '<div class="geo-results"></div></div>';
  }
  function readPlaceRows(keepEmpty){ var arr=[]; drawerBody.querySelectorAll(".place-row").forEach(function(r){
    var type=r.querySelector(".pl-type").value, label=r.querySelector(".pl-label").value.trim(), year=r.querySelector(".pl-year").value.trim();
    var lat=r.getAttribute("data-lat"), lng=r.getAttribute("data-lng");
    var o={type:type,label:label,year:year};
    if(lat!=null&&lng!=null&&lat!==""){ o.lat=parseFloat(lat); o.lng=parseFloat(lng); }
    if(label||o.lat!=null||keepEmpty) arr.push(o); }); return arr; }
  function renderPlaceRows(list){ var box=$("placeRows"); if(!box)return; box.innerHTML=(list||[]).map(placeRowHtml).join("");
    box.querySelectorAll(".pl-rm").forEach(function(b){ b.addEventListener("click",function(){ var snap=readPlaceRows(true);
      var rows=Array.prototype.slice.call(box.querySelectorAll(".place-row")); var idx=rows.indexOf(b.closest(".place-row")); if(idx>-1)snap.splice(idx,1); renderPlaceRows(snap); }); });
    box.querySelectorAll(".pl-find").forEach(function(b){ b.addEventListener("click",function(){ doGeocode(b.closest(".place-row")); }); });
  }
  var geoTimer=null;
  function doGeocode(row){
    var q=row.querySelector(".pl-label").value.trim(); if(!q) return;
    var res=row.querySelector(".geo-results"); res.innerHTML='<button type="button" disabled>…</button>'; res.classList.add("open");
    geocode(q).then(function(list){
      if(!list.length){ res.innerHTML='<button type="button" disabled>—</button>'; return; }
      res.innerHTML="";
      list.forEach(function(item){
        var b=document.createElement("button"); b.type="button"; b.textContent=item.display_name;
        b.addEventListener("click",function(){
          row.setAttribute("data-lat", parseFloat(item.lat)); row.setAttribute("data-lng", parseFloat(item.lon));
          var ct=row.querySelector(".coordtag"); ct.classList.add("set");
          ct.querySelector(".ct-ic").textContent="📍"; ct.querySelector(".ct-txt").textContent=T("coordSet");
          res.classList.remove("open"); res.innerHTML="";
          if(!row.querySelector(".pl-label").value.trim()){ row.querySelector(".pl-label").value=item.display_name.split(",")[0]; }
        });
        res.appendChild(b);
      });
    }).catch(function(){ res.innerHTML='<button type="button" disabled>—</button>'; });
  }
  function geocode(q){
    var url="https://nominatim.openstreetmap.org/search?format=jsonv2&limit=6&accept-language="+(lang==="el"?"el":"en")+"&q="+encodeURIComponent(q);
    return fetch(url,{headers:{"Accept":"application/json"}}).then(function(r){ return r.ok?r.json():[]; });
  }

  function openEditor(pid,isNew){
    var p=P(pid); if(!p) return;
    editingId=pid; selectedId=pid; $("drawerFoot").style.display="";
    var nm=nameFor(p,lang); $("drawerTitle").textContent=nm.primary||nm.secondary||T("newPerson");
    var html="";
    html+='<div class="photo-edit"><div class="photo-thumb" id="ph_thumb">'+(p.photo?"":esc(initialOf(p)))+'</div>'+
      '<div class="photo-actions"><button type="button" class="mini" id="ph_pick">'+esc(T("addPhoto"))+'</button>'+
      '<button type="button" class="mini ghost" id="ph_rm" '+(p.photo?"":'style="display:none"')+'>'+esc(T("removePhoto"))+'</button></div>'+
      '<input type="file" accept="image/*" id="ph_file" style="display:none" /></div>';
    html+=fieldRow(T("nameEl"),"f_el",p.nameEl,"el",T("placeholderEl"),false);
    html+=fieldRow(T("nameEn"),"f_en",p.nameEn,"",T("placeholderEn"),false);
    html+=fieldRow(T("maiden"),"f_maiden",p.maiden,"","",false);
    html+='<div class="two">'+fieldRow(T("born"),"f_birth",p.birth,"","",false)+fieldRow(T("died"),"f_death",p.death,"","",false)+'</div>';
    html+=fieldRow(T("place"),"f_place",p.place,"","",false);
    html+=fieldRow(T("notes"),"f_notes",p.notes,"","",true);
    html+='<div class="sec-title">'+esc(T("places"))+'</div><div id="placeRows"></div><button type="button" class="btn add-row" id="addPlace">'+esc(T("addPlace"))+'</button>';
    html+='<div class="sec-title">'+esc(T("mediaLinks"))+'</div><div id="mediaRows"></div><button type="button" class="btn add-row" id="addMedia">'+esc(T("addMediaLink"))+'</button>';
    html+='<div class="sec-title">'+esc(T("relations"))+'</div><div class="rel-grid">'+
      '<button class="btn" data-rel="parent">'+esc(T("addParent"))+'</button><button class="btn" data-rel="partner">'+esc(T("addPartner"))+'</button>'+
      '<button class="btn" data-rel="child">'+esc(T("addChild"))+'</button><button class="btn" data-rel="sibling">'+esc(T("addSibling"))+'</button></div>';
    drawerBody.innerHTML=html; drawerBody.scrollTop=0;
    renderMediaRows(p.media||[]); renderPlaceRows(p.places||[]);
    if(p.photo) $("ph_thumb").style.backgroundImage='url("'+p.photo+'")';

    $("ph_pick").addEventListener("click",function(){ $("ph_file").click(); });
    $("ph_file").addEventListener("change",function(e){ var f=e.target.files&&e.target.files[0]; if(!f)return;
      downscale(f,function(d){ if(!d){toast(T("photoErr"));return;} P(editingId).photo=d; var th=$("ph_thumb"); th.textContent=""; th.style.backgroundImage='url("'+d+'")'; $("ph_rm").style.display=""; }); });
    $("ph_rm").addEventListener("click",function(){ P(editingId).photo=""; var th=$("ph_thumb"); th.style.backgroundImage=""; th.textContent=initialOf(P(editingId)); this.style.display="none"; });
    $("addMedia").addEventListener("click",function(){ var snap=readMediaRows(true); snap.push({kind:"video",label:"",url:""}); renderMediaRows(snap);
      var rows=$("mediaRows").querySelectorAll(".media-row"); var last=rows[rows.length-1]; if(last)last.querySelector(".m-url").focus(); });
    $("addPlace").addEventListener("click",function(){ var snap=readPlaceRows(true); snap.push({type:"lived",label:"",year:""}); renderPlaceRows(snap);
      var rows=$("placeRows").querySelectorAll(".place-row"); var last=rows[rows.length-1]; if(last)last.querySelector(".pl-label").focus(); });

    drawerBody.querySelectorAll("[data-rel]").forEach(function(b){ b.addEventListener("click",function(){ commitFields();
      var rel=b.getAttribute("data-rel");
      if(rel==="parent")addParent(editingId); else if(rel==="partner")addPartner(editingId); else if(rel==="child")addChild(editingId); else if(rel==="sibling")addSibling(editingId); }); });

    drawer.classList.add("open"); scrim.classList.add("open"); drawer.setAttribute("aria-hidden","false");
    render();
    setTimeout(function(){ var el=$(lang==="el"?"f_el":"f_en"); if(el)el.focus(); },60);
  }

  function commitFields(){
    if(!editingId||!P(editingId)) return;
    var p=P(editingId), g=function(id){var el=$(id);return el?el.value:undefined;};
    if(g("f_el")!==undefined)p.nameEl=g("f_el").trim();
    if(g("f_en")!==undefined)p.nameEn=g("f_en").trim();
    if(g("f_maiden")!==undefined)p.maiden=g("f_maiden").trim();
    if(g("f_birth")!==undefined)p.birth=g("f_birth").trim();
    if(g("f_death")!==undefined)p.death=g("f_death").trim();
    if(g("f_place")!==undefined)p.place=g("f_place").trim();
    if(g("f_notes")!==undefined)p.notes=g("f_notes").trim();
    if($("mediaRows")) p.media=readMediaRows(false);
    if($("placeRows")) p.places=readPlaceRows(false);
  }
  function saveAndClose(){ if(editingId) commitFields(); closeDrawer(); render(); scheduleSave(true); }
  function closeDrawer(){ drawer.classList.remove("open"); scrim.classList.remove("open"); drawer.setAttribute("aria-hidden","true"); editingId=null; }

  function pfield(k,v){ return '<div class="p-field"><div class="k">'+esc(k)+'</div><div class="v">'+esc(v)+'</div></div>'; }
  function openProfile(pid){
    var p=P(pid); if(!p)return; selectedId=pid; editingId=null; $("drawerFoot").style.display="none";
    var nm=nameFor(p,lang), yr=yearsFor(p);
    $("drawerTitle").textContent=nm.primary||nm.secondary||T("newPerson");
    var h='<div class="profile"><div class="p-photo'+(yr.dec?" dec":"")+'" id="prof_photo">'+(p.photo?"":esc(initialOf(p)))+'</div>';
    h+='<div class="p-name">'+esc(nm.primary||nm.secondary||T("newPerson"))+'</div>';
    if(nm.primary&&nm.secondary) h+='<div class="p-alt">'+esc(nm.secondary)+'</div>';
    var dp=[]; if(p.birth)dp.push(T("born")+" "+p.birth); if(p.death)dp.push(T("died")+" "+p.death);
    if(dp.length) h+='<div class="p-dates">'+(yr.dec?"† ":"")+esc(dp.join("   ·   "))+'</div>';
    if(p.maiden) h+=pfield(T("maiden"),p.maiden);
    if(p.place) h+=pfield(T("place"),p.place);
    if(p.notes) h+=pfield(T("notes"),p.notes);
    var places=(p.places||[]).filter(function(x){return x.label||(isNum(x.lat)&&isNum(x.lng));});
    if(places.length){ h+='<div class="p-field"><div class="k">'+esc(T("places"))+'</div><div class="p-places">';
      places.forEach(function(pl){ h+='<div class="p-place"><span class="sw" style="background:'+typeColor(pl.type)+'"></span>'+
        '<span class="pt">'+esc(typeLabel(pl.type))+'</span><span class="pl">'+esc(pl.label||"")+'</span>'+(pl.year?'<span class="py">'+esc(pl.year)+'</span>':'')+'</div>'; });
      h+='</div></div>'; }
    var media=(p.media||[]).filter(function(m){return /^https?:\/\//i.test(m.url);});
    if(media.length){ h+='<div class="p-media">'; media.forEach(function(m){ var ic=ICON[m.kind]||ICON.link;
      var lbl=m.label||(m.kind==="audio"?T("listen"):m.kind==="video"?T("watch"):T("open"));
      h+='<a class="p-mediabtn" href="'+esc(m.url)+'" target="_blank" rel="noopener noreferrer"><span class="mi">'+ic+'</span><span class="ml">'+esc(lbl)+'</span><span class="go">↗</span></a>'; }); h+='</div>'; }
    h+='</div>';
    drawerBody.innerHTML=h; drawerBody.scrollTop=0;
    if(p.photo){ var pp=$("prof_photo"); if(pp)pp.style.backgroundImage='url("'+p.photo+'")'; }
    drawer.classList.add("open"); scrim.classList.add("open"); drawer.setAttribute("aria-hidden","false"); render();
  }
  function openPerson(pid){ if(editMode) openEditor(pid,false); else openProfile(pid); }

  /* ================= Save (API) ================= */
  var saveTimer=null, saving=false, pendingAgain=false;
  function setSaveInd(cls,txt){ var el=$("saveInd"); el.className="save-ind"+(cls?" "+cls:""); $("saveTxt").textContent=txt||""; }
  function scheduleSave(now){ if(saveTimer){clearTimeout(saveTimer);saveTimer=null;} if(now)doSave(); else saveTimer=setTimeout(doSave,1000); }
  function doSave(){
    if(!editMode||!passcode) return;
    if(saving){ pendingAgain=true; return; }
    saving=true; setSaveInd("saving",T("saving"));
    fetch("/api/tree",{method:"POST",headers:{"content-type":"application/json"},
      body:JSON.stringify({passcode:passcode,baseVersion:state.version,data:{title:state.title,people:state.people}})})
    .then(function(r){ return r.json().then(function(j){return {status:r.status,j:j};}); })
    .then(function(res){ saving=false;
      if(res.status===200&&res.j.ok){ state.version=res.j.version; setSaveInd("saved",T("saved")); if(pendingAgain){pendingAgain=false;doSave();} return; }
      if(res.status===401){ passcode=""; try{localStorage.removeItem("kz_pass");}catch(e){} setEditMode(false); openPasscode(); setSaveInd("",""); return; }
      if(res.status===409&&res.j.current){ applyServer(res.j.current); render(); if(mapReady&&document.body.classList.contains("mapview"))renderMap(); toast(T("conflictReload")); setSaveInd("",""); return; }
      setSaveInd("offline",T("offline")); })
    .catch(function(){ saving=false; setSaveInd("offline",T("offline")); });
  }

  /* ================= Map ================= */
  var map=null, markerLayer=null, lineLayer=null, mapReady=false;
  function initMap(){ if(map)return;
    map=L.map("map",{zoomControl:true,worldCopyJump:true}).setView([39.2,22.0],5);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:18,attribution:'© OpenStreetMap contributors'}).addTo(map);
    markerLayer=L.layerGroup().addTo(map); lineLayer=L.layerGroup().addTo(map); mapReady=true;
  }
  function pinIcon(color){ return L.divIcon({className:"kz-pin",html:'<span style="background:'+color+'"></span>',iconSize:[19,19],iconAnchor:[9,9],popupAnchor:[0,-9]}); }
  function placeItems(){ var items=[]; persons().forEach(function(p){ (p.places||[]).forEach(function(pl){ if(isNum(pl.lat)&&isNum(pl.lng)) items.push({p:p,pl:pl}); }); }); return items; }
  function typeCounts(){ var c={}; PLACE_TYPES.forEach(function(t){c[t]=0;}); placeItems().forEach(function(it){c[it.pl.type]=(c[it.pl.type]||0)+1;}); return c; }
  function renderMapPersonSelect(){
    var sel=$("mapPerson"), cur=sel.value;
    var opts='<option value="">'+esc(T("allPeople"))+'</option>';
    persons().filter(function(p){return (p.places||[]).some(function(x){return isNum(x.lat)&&isNum(x.lng);});})
      .sort(function(a,b){var na=nameFor(a,lang).primary||nameFor(a,lang).secondary||"";var nb=nameFor(b,lang).primary||nameFor(b,lang).secondary||"";return na.localeCompare(nb);})
      .forEach(function(p){ var nm=nameFor(p,lang); opts+='<option value="'+p.id+'">'+esc(nm.primary||nm.secondary||T("newPerson"))+'</option>'; });
    sel.innerHTML=opts; if(cur&&P(cur)) sel.value=cur;
  }
  function renderLegend(){ var counts=typeCounts(), box=$("legend"); box.innerHTML="";
    PLACE_TYPES.forEach(function(t){ var b=document.createElement("button"); b.className=hiddenTypes[t]?"off":"";
      b.innerHTML='<span class="sw" style="background:'+typeColor(t)+'"></span>'+esc(typeLabel(t))+'<span class="ct">'+(counts[t]||0)+'</span>';
      b.addEventListener("click",function(){ hiddenTypes[t]=!hiddenTypes[t]; renderMap(); }); box.appendChild(b); }); }
  function renderMap(){
    initMap(); markerLayer.clearLayers(); lineLayer.clearLayers();
    renderMapPersonSelect();
    var pf=$("mapPerson").value;
    var items=placeItems().filter(function(it){ if(pf&&it.p.id!==pf)return false; if(hiddenTypes[it.pl.type])return false; return true; });
    var bounds=[];
    items.forEach(function(it){ var m=L.marker([it.pl.lat,it.pl.lng],{icon:pinIcon(typeColor(it.pl.type))});
      var nm=nameFor(it.p,lang), nms=nm.primary||nm.secondary||T("newPerson");
      var sub=typeLabel(it.pl.type)+(it.pl.label?" · "+it.pl.label:"")+(it.pl.year?" · "+it.pl.year:"");
      m.bindPopup('<div class="kzpop"><div class="n">'+esc(nms)+'</div><div class="t">'+esc(sub)+'</div></div>');
      m.on("click",function(){ selectedId=it.p.id; });
      markerLayer.addLayer(m); bounds.push([it.pl.lat,it.pl.lng]); });
    if(pf){ var seq=(P(pf).places||[]).filter(function(x){return isNum(x.lat)&&isNum(x.lng);})
        .slice().sort(function(a,b){return (parseInt(a.year,10)||0)-(parseInt(b.year,10)||0);});
      if(seq.length>1){ var lineC=(getComputedStyle(document.documentElement).getPropertyValue("--line")||"#b7a98a").trim();
        lineLayer.addLayer(L.polyline(seq.map(function(x){return [x.lat,x.lng];}),{color:lineC,weight:2,opacity:.8,dashArray:"4 5"})); } }
    renderLegend();
    if(bounds.length){ try{ map.fitBounds(bounds,{padding:[60,60],maxZoom:9}); }catch(e){} }
    setTimeout(function(){ map.invalidateSize(); },30);
  }

  /* ================= Pan / Zoom ================= */
  function clampK(k){ return Math.max(0.25,Math.min(2.2,k)); }
  function zoomAt(f,cx,cy){ var r=viewport.getBoundingClientRect(); var px=cx!=null?cx:r.width/2, py=cy!=null?cy:r.height/2;
    var k2=clampK(tx.k*f), g=k2/tx.k; tx.x=px-(px-tx.x)*g; tx.y=py-(py-tx.y)*g; tx.k=k2; applyTransform(); saveUI(); }
  function fit(){ var layout=computeLayout(), r=viewport.getBoundingClientRect(), pad=60;
    var k=clampK(Math.min((r.width-pad)/layout.w,(r.height-pad)/layout.h,1.4));
    tx.k=k; tx.x=(r.width-layout.w*k)/2; tx.y=Math.min(90,Math.max(24,(r.height-layout.h*k)/2)); applyTransform(); saveUI(); }
  var panning=false,panStart=null;
  viewport.addEventListener("pointerdown",function(e){ if(e.target.closest(".card")||e.target.closest(".zoom")||e.target.closest(".status-pill"))return;
    panning=true; panStart={x:e.clientX-tx.x,y:e.clientY-tx.y}; viewport.classList.add("grabbing"); viewport.setPointerCapture(e.pointerId); });
  viewport.addEventListener("pointermove",function(e){ if(!panning)return; tx.x=e.clientX-panStart.x; tx.y=e.clientY-panStart.y; applyTransform(); });
  function endPan(){ if(panning){panning=false;viewport.classList.remove("grabbing");saveUI();} }
  viewport.addEventListener("pointerup",endPan); viewport.addEventListener("pointercancel",endPan);
  viewport.addEventListener("wheel",function(e){ e.preventDefault(); var r=viewport.getBoundingClientRect();
    if(e.ctrlKey) zoomAt(e.deltaY<0?1.1:0.9,e.clientX-r.left,e.clientY-r.top); else { tx.x-=e.deltaX; tx.y-=e.deltaY; applyTransform(); saveUI(); } },{passive:false});

  /* ================= Passcode / edit mode ================= */
  function setEditMode(on){ editMode=on; document.body.classList.toggle("editmode",on);
    $("editLbl").textContent=on?T("editUnlocked"):T("editLocked");
    var ei=$("editIcon"); ei.innerHTML = on
      ? '<path d="M6 10V7a6 6 0 0111.5-2.3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><rect x="4.5" y="10" width="15" height="10" rx="2.2" stroke="currentColor" stroke-width="1.6"/><path d="M12 14v2.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>'
      : '<path d="M6 10V8a6 6 0 1112 0v2" stroke="currentColor" stroke-width="1.6"/><rect x="4.5" y="10" width="15" height="10" rx="2.2" stroke="currentColor" stroke-width="1.6"/>';
  }
  function openPasscode(){ $("pcTitle").textContent=T("pcTitle"); $("pcLede").textContent=T("pcLede");
    $("pcInput").value=""; $("pcInput").placeholder=T("pcPlaceholder"); $("pcErr").textContent="";
    $("pcOk").textContent=T("pcOk"); $("pcCancel").textContent=T("pcCancel");
    $("pcModal").classList.add("open"); setTimeout(function(){$("pcInput").focus();},60); }
  function closePasscode(){ $("pcModal").classList.remove("open"); }
  function submitPasscode(){ var val=$("pcInput").value; if(!val)return;
    $("pcErr").textContent="";
    fetch("/api/tree",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({passcode:val,verify:true})})
    .then(function(r){ if(r.status===200){ passcode=val; try{localStorage.setItem("kz_pass",val);}catch(e){} setEditMode(true); closePasscode(); }
      else { $("pcErr").textContent=T("pcWrong"); } })
    .catch(function(){ $("pcErr").textContent=T("offline"); }); }

  /* ================= Events ================= */
  stage.addEventListener("click",function(e){ var card=e.target.closest(".card"); if(!card)return; openPerson(card.getAttribute("data-id")); });
  stage.addEventListener("keydown",function(e){ var card=e.target.closest(".card"); if(card&&(e.key==="Enter"||e.key===" ")){e.preventDefault();openPerson(card.getAttribute("data-id"));} });

  function switchView(toMap){ document.body.classList.toggle("mapview",toMap);
    $("viewMap").setAttribute("aria-pressed",toMap); $("viewTree").setAttribute("aria-pressed",!toMap);
    if(toMap){ renderMap(); } }
  $("viewTree").addEventListener("click",function(){ switchView(false); });
  $("viewMap").addEventListener("click",function(){ switchView(true); });

  $("langEl").addEventListener("click",function(){ lang="el"; paintChrome(); render(); if(document.body.classList.contains("mapview"))renderMap(); saveUI(); });
  $("langEn").addEventListener("click",function(){ lang="en"; paintChrome(); render(); if(document.body.classList.contains("mapview"))renderMap(); saveUI(); });
  $("addBtn").addEventListener("click",function(){ if(!editMode)return; if(persons().length===0){addFirst();return;} var np=newPerson(); state.people[np.id]=np; render(); openEditor(np.id,true); });
  $("ehAdd").addEventListener("click",function(){ if(editMode)addFirst(); });
  $("editBtn").addEventListener("click",function(){ if(editMode){ setEditMode(false); } else { openPasscode(); } });
  $("zIn").addEventListener("click",function(){ zoomAt(1.18); });
  $("zOut").addEventListener("click",function(){ zoomAt(0.85); });
  $("zFit").addEventListener("click",fit);
  $("saveBtn").addEventListener("click",saveAndClose);
  $("drawerClose").addEventListener("click",function(){ if(editingId)saveAndClose(); else closeDrawer(); });
  $("scrim").addEventListener("click",function(){ if(editingId)saveAndClose(); else closeDrawer(); });
  $("delBtn").addEventListener("click",function(){ if(!editingId)return; if(window.confirm(T("del")+"?"))removePerson(editingId); });
  $("mapPerson").addEventListener("change",renderMap);
  $("pcOk").addEventListener("click",submitPasscode);
  $("pcCancel").addEventListener("click",closePasscode);
  $("pcInput").addEventListener("keydown",function(e){ if(e.key==="Enter")submitPasscode(); });
  $("pcModal").addEventListener("click",function(e){ if(e.target.id==="pcModal")closePasscode(); });
  document.addEventListener("keydown",function(e){ if(e.key==="Escape"){
    if($("helpModal").classList.contains("open"))closeHelp();
    else if($("pcModal").classList.contains("open"))closePasscode();
    else if(drawer.classList.contains("open")){ if(editingId)saveAndClose(); else closeDrawer(); } } });

  function openHelp(){ $("helpTitle").textContent=T("helpTitle"); $("helpLede").textContent=T("helpLede");
    var ol=$("helpSteps"); ol.innerHTML=""; T("steps").forEach(function(s){var li=document.createElement("li");li.innerHTML=s;ol.appendChild(li);});
    $("helpNote").innerHTML=T("note"); $("helpModal").classList.add("open"); }
  function closeHelp(){ $("helpModal").classList.remove("open"); }
  $("helpBtn").addEventListener("click",openHelp);
  $("helpClose").addEventListener("click",closeHelp);
  $("helpModal").addEventListener("click",function(e){ if(e.target.id==="helpModal")closeHelp(); });

  function toast(msg){ var t=$("toast"); t.textContent=msg; t.classList.add("show"); setTimeout(function(){t.classList.remove("show");},2600); }

  /* ================= Boot ================= */
  function applyServer(d){ if(!d)return; state.title=d.title||state.title; state.people=(d.people&&typeof d.people==="object")?d.people:{}; state.version=d.version||0; }
  paintChrome(); setEditMode(!!passcode); render(); applyTransform();
  if(!sessionStorage.getItem("kz_ui")) setTimeout(fit,40);

  fetch("/api/tree",{cache:"no-store"}).then(function(r){return r.ok?r.json():null;}).then(function(d){
    if(d){ applyServer(d); paintChrome(); render(); if(!sessionStorage.getItem("kz_ui"))fit(); }
    // verify stored passcode quietly
    if(passcode){ fetch("/api/tree",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({passcode:passcode,verify:true})})
      .then(function(r){ if(r.status!==200){ passcode=""; try{localStorage.removeItem("kz_pass");}catch(e){} setEditMode(false); } }).catch(function(){}); }
  }).catch(function(){});

})();
