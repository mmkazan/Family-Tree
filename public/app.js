(function(){
  "use strict";

  /* ================= i18n ================= */
  var STR = {
    en:{
      sub:"Family Tree", add:"Add person",
      viewTree:"Tree", viewMap:"Map", viewTapestry:"Tapestry",
      tapExport:"Export", tapPng:"Download image (PNG)", tapSvg:"Download vector (SVG)", tapPrint:"Print poster",
      tapEmpty:"Add people to weave the family tapestry.", tapHint:"Each person's Notes become the caption; a matching emblem is stitched in automatically (say “pilot”, “teacher”, “nurse”…).",
      editLocked:"Unlock to edit", editUnlocked:"Editing",
      ehTitle:"Begin the family tree", ehText:"Add the first person — a grandparent, a parent, or yourself — then build outward from there.",
      ehAdd:"Add the first person",
      nameEn:"Name (English / Latin)", nameEl:"Name (Greek · Ελληνικά)",
      maiden:"Family name at birth (if changed)", born:"Born", died:"Died",
      place:"Birthplace", notes:"Notes",
      placeholderEn:"e.g. Georgios Kazantzis", placeholderEl:"π.χ. Γεώργιος Καζαντζής",
      relations:"Relatives", addParent:"＋ Parent", addPartner:"＋ Partner", addChild:"＋ Child", addSibling:"＋ Sibling",
      raisedBy:"Raised by (if not the parents)", addGuardian:"Add", chooseGuardian:"Choose a person…",
      del:"Remove", save:"Save", newPerson:"New person",
      addPhoto:"Add photo", removePhoto:"Remove photo", photoErr:"Sorry — couldn't read that image.",
      mediaLinks:"Audio & video links", addMediaLink:"＋ Add a link",
      kAudio:"Audio", kVideo:"Video", kImage:"Photo", kLink:"Link", mLabel:"Label (optional)",
      listen:"Listen", watch:"Watch", open:"Open",
      trFromEn:"from English", trFromEl:"from Greek",
      places:"Other life locations", addPlace:"＋ Add a place", findPlace:"Find", placeName:"Place name", yearShort:"Year",
      coordSet:"Pinned on the map", coordNone:"Type a place, then Find to pin it",
      showPerson:"Show", allPeople:"Everyone", lifeEvents:"Life events", dragTip:"Drag any pin to move it — the address text updates and it saves automatically.",
      addPlaceMap:"＋ Add place on map", addPlaceExit:"Click the map to drop a pin…", openDetails:"Open details", editDetails:"Edit details",
      pickPersonFirst:"Choose a person under “Show” first, then click the map.", addressFound:"Address updated to: {a}",
      moveCard:"Move on canvas", moveHint:"Drag {a} to its spot, then tap Done", moveDone:"Card moved.", doneBtn:"Done", holdToMove:"Tip: press and hold a card to move it.",
      undoLbl:"Undo", redoLbl:"Redo", undone:"Undone", redone:"Redone",
      arrange:"Auto-arrange", linkTip:"Drag to another card to link them", howRelated:"How are they related?",
      relParentOf:"{a} is {b}'s parent", relChildOf:"{a} is {b}'s child", relPartners:"{a} & {b} are partners", relRaised:"{a} raised {b}",
      linkedToCouple:"Added as child of {a} & {b}",
      editLink:"Edit this connection", removeParent:"Remove {a} as {b}'s parent", removePartners:"Unlink {a} & {b} (partners)", removeRaised:"Remove: {a} raised {b}",
      curParents:"Parents", curPartner:"Partner", curChildren:"Children", noneYet:"—",
      nick:"Also known as", sexLabel:"Sex", sexU:"—", sexM:"Male", sexF:"Female", source:"Source (where this info came from)",
      tBaptism:"Baptism", tMilitary:"Military", tImmigration:"Immigration", tMarried:"Marriage", tBurial:"Burial",
      searchPh:"Search people…", noResults:"No matches",
      dataMenu:"Backup & export", backupJson:"Download backup (.json)", exportGed:"Export GEDCOM (.ged)", restoreJson:"Restore from backup…",
      restoreConfirm:"Replace the whole tree with this backup? Your current tree will be overwritten.", restoreBad:"That file doesn't look like a valid backup.", restored:"Backup restored.",
      dataLang:"Language & display…", dataShare:"Share…", shareBtn:"Share",
      setTitle:"Language & display", setLede:"Choose how names appear across the tree.",
      setBi:"Two languages (bilingual)", setBiSub:"Every person has a main (Latin) name and a second-language name, with a language switch on the tree.",
      setMono:"One language (English only)", setMonoSub:"A single name per person. Hides the second-language field and the language switch.",
      setSecond:"Second language", setSaved:"Display settings updated.",
      shareTitle:"Share this tree", shareLede:"Send a link to family. A view link is read-only; an edit link lets them add and change people.",
      shViewLbl:"View link (read-only)", shEditLbl:"Edit link (can add & change)", copy:"Copy", copied:"Copied", shareDone:"Done",
      shPriv:"Require a link to view (private)", shPrivSub:"When on, nobody can open the tree without a link — even with the address.",
      shRotate:"Reset links", shRotateConfirm:"Reset both links? Anyone using the old links will lose access.", shareNeedSave:"Unlock to edit first.", linkCopied:"Link copied.",
      tBorn:"Born", tRaised:"Raised", tEducated:"Educated", tWorked:"Worked", tLived:"Lived", tDied:"Died", tOther:"Other",
      readonly:"Viewing only — unlock with the family password to add or edit.",
      pcTitle:"Family edit access", pcLede:"Enter the family password to add and edit people.",
      pcPlaceholder:"Family password", pcOk:"Unlock", pcCancel:"Cancel", pcWrong:"That password didn't match. Try again.",
      saving:"Saving…", saved:"Saved", offline:"Not saved", conflictReload:"Someone else updated the tree — loaded the latest.",
      helpTitle:"Building your family tree", helpLede:"A shared, bilingual tree the whole family can grow together.",
      steps:[
        "<b>Unlock to edit.</b> Anyone can view the tree. To add or change people, press <b>Unlock to edit</b> and enter the family password.",
        "<b>Add people.</b> Use <b>Add person</b> (or ＋ Parent / Child / Partner / Sibling inside a card) to add people, then <b>drag any card</b> to place it wherever you like.",
        "<b>Link people.</b> Hover a card and drag from the little dot at its bottom onto another card, then choose how they're related (parent, child, partner, or raised-by). To make two people a couple with children between them, link the parents as partners, then <b>drag a child's dot straight onto the line between the two parents</b> — the child hangs from the middle of the couple. (Dropping onto either parent's card links to just that one parent.)",
        "<b>Change or remove a link.</b> Click the line between two people to remove that connection, or open a person to see their parents, partner and children and remove any with the ✕.",
        "<b>Two languages.</b> Every person has a Greek name and a Latin/English name. Use the <b>ΕΛ / EN</b> switch to read the whole tree either way.",
        "<b>Photos, clips &amp; places.</b> Open a person to add a photo, links to audio or video, and life locations — born, raised, lived, and more.",
        "<b>Map view.</b> Switch to <b>Map</b> to see where the family was born, lived and worked, pinned across Greece and beyond. In edit mode you can drag any pin to the exact spot.",
        "<b>Raised by someone else?</b> Open a person and use <b>Raised by</b> to link the aunt, grandparent or guardian who brought them up — it shows on the tree as a dotted line.",
        "<b>It saves for everyone.</b> Changes save automatically, so anyone with the link sees the latest tree."
      ],
      note:"Share the link with anyone to let them view the tree. Give the family password only to relatives you want to be able to add and edit people."
    },
    el:{
      sub:"Οικογενειακό Δέντρο", add:"Προσθήκη ατόμου",
      viewTree:"Δέντρο", viewMap:"Χάρτης", viewTapestry:"Ταπισερί",
      tapExport:"Εξαγωγή", tapPng:"Λήψη εικόνας (PNG)", tapSvg:"Λήψη διανύσματος (SVG)", tapPrint:"Εκτύπωση αφίσας",
      tapEmpty:"Προσθέστε άτομα για να υφάνετε το οικογενειακό ταπισερί.", tapHint:"Οι σημειώσεις κάθε ατόμου γίνονται λεζάντα· ένα σχετικό έμβλημα κεντιέται αυτόματα (π.χ. «πιλότος», «δάσκαλος», «νοσοκόμα»…).",
      editLocked:"Ξεκλείδωμα", editUnlocked:"Επεξεργασία",
      ehTitle:"Ξεκινήστε το οικογενειακό δέντρο", ehText:"Προσθέστε το πρώτο άτομο — έναν παππού, έναν γονέα ή εσάς — και χτίστε από εκεί.",
      ehAdd:"Προσθέστε το πρώτο άτομο",
      nameEn:"Όνομα (Λατινικά · English)", nameEl:"Όνομα (Ελληνικά)",
      maiden:"Πατρικό όνομα / γένος (αν άλλαξε)", born:"Γεννήθηκε", died:"Απεβίωσε",
      place:"Τόπος γέννησης", notes:"Σημειώσεις",
      placeholderEn:"π.χ. Georgios Kazantzis", placeholderEl:"π.χ. Γεώργιος Καζαντζής",
      relations:"Συγγενείς", addParent:"＋ Γονέας", addPartner:"＋ Σύζυγος", addChild:"＋ Παιδί", addSibling:"＋ Αδέλφι",
      raisedBy:"Ανατράφηκε από (αν όχι οι γονείς)", addGuardian:"Προσθήκη", chooseGuardian:"Επιλέξτε άτομο…",
      del:"Διαγραφή", save:"Αποθήκευση", newPerson:"Νέο άτομο",
      addPhoto:"Προσθήκη φωτογραφίας", removePhoto:"Αφαίρεση φωτογραφίας", photoErr:"Δεν ήταν δυνατή η ανάγνωση της εικόνας.",
      mediaLinks:"Σύνδεσμοι ήχου & βίντεο", addMediaLink:"＋ Προσθήκη συνδέσμου",
      kAudio:"Ήχος", kVideo:"Βίντεο", kImage:"Φωτογραφία", kLink:"Σύνδεσμος", mLabel:"Ετικέτα (προαιρετικά)",
      listen:"Ακρόαση", watch:"Παρακολούθηση", open:"Άνοιγμα",
      trFromEn:"από Αγγλικά", trFromEl:"από Ελληνικά",
      places:"Άλλοι τόποι ζωής", addPlace:"＋ Προσθήκη τόπου", findPlace:"Εύρεση", placeName:"Όνομα τόπου", yearShort:"Έτος",
      coordSet:"Καρφιτσωμένο στον χάρτη", coordNone:"Γράψτε τόπο και πατήστε Εύρεση",
      showPerson:"Προβολή", allPeople:"Όλοι", lifeEvents:"Γεγονότα ζωής", dragTip:"Σύρετε μια πινέζα — το κείμενο διεύθυνσης ενημερώνεται και αποθηκεύεται αυτόματα.",
      addPlaceMap:"＋ Προσθήκη τόπου στον χάρτη", addPlaceExit:"Κάντε κλικ στον χάρτη για πινέζα…", openDetails:"Άνοιγμα στοιχείων", editDetails:"Επεξεργασία",
      pickPersonFirst:"Επιλέξτε πρώτα ένα άτομο στο «Προβολή», μετά κάντε κλικ στον χάρτη.", addressFound:"Η διεύθυνση ενημερώθηκε σε: {a}",
      moveCard:"Μετακίνηση στον καμβά", moveHint:"Σύρετε τον/την {a} στη θέση του, μετά πατήστε Τέλος", moveDone:"Η κάρτα μετακινήθηκε.", doneBtn:"Τέλος", holdToMove:"Συμβουλή: κρατήστε πατημένη μια κάρτα για μετακίνηση.",
      undoLbl:"Αναίρεση", redoLbl:"Επανάληψη", undone:"Έγινε αναίρεση", redone:"Έγινε επανάληψη",
      arrange:"Τακτοποίηση", linkTip:"Σύρετε σε άλλη κάρτα για σύνδεση", howRelated:"Πώς σχετίζονται;",
      relParentOf:"Ο/Η {a} είναι γονέας του/της {b}", relChildOf:"Ο/Η {a} είναι παιδί του/της {b}", relPartners:"{a} & {b} είναι σύζυγοι", relRaised:"Ο/Η {a} ανέθρεψε τον/την {b}",
      linkedToCouple:"Προστέθηκε ως παιδί των {a} & {b}",
      editLink:"Επεξεργασία σύνδεσης", removeParent:"Αφαίρεση {a} ως γονέα του/της {b}", removePartners:"Αποσύνδεση {a} & {b}", removeRaised:"Αφαίρεση: {a} ανέθρεψε {b}",
      curParents:"Γονείς", curPartner:"Σύζυγος", curChildren:"Παιδιά", noneYet:"—",
      nick:"Επίσης γνωστός/ή ως", sexLabel:"Φύλο", sexU:"—", sexM:"Άνδρας", sexF:"Γυναίκα", source:"Πηγή (από πού προέρχεται)",
      tBaptism:"Βάπτιση", tMilitary:"Στρατός", tImmigration:"Μετανάστευση", tMarried:"Γάμος", tBurial:"Ταφή",
      searchPh:"Αναζήτηση ατόμων…", noResults:"Καμία αντιστοιχία",
      dataMenu:"Αντίγραφο & εξαγωγή", backupJson:"Λήψη αντιγράφου (.json)", exportGed:"Εξαγωγή GEDCOM (.ged)", restoreJson:"Επαναφορά από αντίγραφο…",
      restoreConfirm:"Αντικατάσταση όλου του δέντρου με αυτό το αρχείο; Το τρέχον δέντρο θα χαθεί.", restoreBad:"Το αρχείο δεν φαίνεται έγκυρο αντίγραφο.", restored:"Έγινε επαναφορά.",
      dataLang:"Γλώσσα & εμφάνιση…", dataShare:"Κοινή χρήση…", shareBtn:"Κοινή χρήση",
      setTitle:"Γλώσσα & εμφάνιση", setLede:"Επιλέξτε πώς εμφανίζονται τα ονόματα στο δέντρο.",
      setBi:"Δύο γλώσσες (δίγλωσσο)", setBiSub:"Κάθε άτομο έχει ένα κύριο (λατινικό) όνομα και ένα όνομα στη δεύτερη γλώσσα, με διακόπτη γλώσσας.",
      setMono:"Μία γλώσσα (μόνο Αγγλικά)", setMonoSub:"Ένα όνομα ανά άτομο. Κρύβει το πεδίο δεύτερης γλώσσας και τον διακόπτη.",
      setSecond:"Δεύτερη γλώσσα", setSaved:"Οι ρυθμίσεις ενημερώθηκαν.",
      shareTitle:"Κοινή χρήση δέντρου", shareLede:"Στείλτε σύνδεσμο στην οικογένεια. Ο σύνδεσμος προβολής είναι μόνο για ανάγνωση· ο σύνδεσμος επεξεργασίας επιτρέπει αλλαγές.",
      shViewLbl:"Σύνδεσμος προβολής (ανάγνωση)", shEditLbl:"Σύνδεσμος επεξεργασίας", copy:"Αντιγραφή", copied:"Αντιγράφηκε", shareDone:"Τέλος",
      shPriv:"Απαιτείται σύνδεσμος για προβολή (ιδιωτικό)", shPrivSub:"Όταν είναι ενεργό, κανείς δεν μπορεί να ανοίξει το δέντρο χωρίς σύνδεσμο.",
      shRotate:"Επαναφορά συνδέσμων", shRotateConfirm:"Επαναφορά συνδέσμων; Όσοι χρησιμοποιούν τους παλιούς θα χάσουν πρόσβαση.", shareNeedSave:"Ξεκλειδώστε πρώτα.", linkCopied:"Ο σύνδεσμος αντιγράφηκε.",
      tBorn:"Γέννηση", tRaised:"Μεγάλωσε", tEducated:"Σπούδασε", tWorked:"Εργάστηκε", tLived:"Έζησε", tDied:"Θάνατος", tOther:"Άλλο",
      readonly:"Μόνο προβολή — ξεκλειδώστε με τον οικογενειακό κωδικό για επεξεργασία.",
      pcTitle:"Πρόσβαση επεξεργασίας", pcLede:"Εισάγετε τον οικογενειακό κωδικό για να προσθέσετε ή να επεξεργαστείτε άτομα.",
      pcPlaceholder:"Οικογενειακός κωδικός", pcOk:"Ξεκλείδωμα", pcCancel:"Άκυρο", pcWrong:"Λάθος κωδικός. Δοκιμάστε ξανά.",
      saving:"Αποθήκευση…", saved:"Αποθηκεύτηκε", offline:"Δεν αποθηκεύτηκε", conflictReload:"Κάποιος άλλος ενημέρωσε το δέντρο — φορτώθηκε το πιο πρόσφατο.",
      helpTitle:"Δημιουργία του οικογενειακού δέντρου", helpLede:"Ένα κοινό, δίγλωσσο δέντρο που όλη η οικογένεια χτίζει μαζί.",
      steps:[
        "<b>Ξεκλείδωμα.</b> Όλοι μπορούν να δουν το δέντρο. Για επεξεργασία, πατήστε <b>Ξεκλείδωμα</b> και βάλτε τον οικογενειακό κωδικό.",
        "<b>Προσθήκη ατόμων.</b> Χρησιμοποιήστε <b>Προσθήκη ατόμου</b> (ή ＋ Γονέας / Παιδί / Σύζυγος / Αδέλφι μέσα σε μια κάρτα) και <b>σύρετε τις κάρτες</b> όπου θέλετε.",
        "<b>Σύνδεση ατόμων.</b> Περάστε πάνω από μια κάρτα και σύρετε από την κουκκίδα στο κάτω μέρος της σε άλλη κάρτα, μετά επιλέξτε τη σχέση. Για ζευγάρι με παιδιά, συνδέστε τους γονείς ως συζύγους και μετά <b>σύρετε την κουκκίδα ενός παιδιού πάνω στη γραμμή ανάμεσα στους δύο γονείς</b> — το παιδί κρέμεται από τη μέση του ζευγαριού.",
        "<b>Αλλαγή ή αφαίρεση σύνδεσης.</b> Κάντε κλικ στη γραμμή μεταξύ δύο ατόμων για να την αφαιρέσετε, ή ανοίξτε ένα άτομο για να δείτε γονείς, σύζυγο και παιδιά και να αφαιρέσετε με το ✕.",
        "<b>Δύο γλώσσες.</b> Κάθε άτομο έχει ελληνικό και λατινικό όνομα. Χρησιμοποιήστε τον διακόπτη <b>ΕΛ / EN</b>.",
        "<b>Φωτογραφίες, κλιπ & τόποι.</b> Ανοίξτε ένα άτομο για φωτογραφία, συνδέσμους ήχου/βίντεο και τόπους ζωής — γέννηση, διαμονή κ.ά.",
        "<b>Προβολή χάρτη.</b> Πατήστε <b>Χάρτης</b> για να δείτε πού γεννήθηκε, έζησε και εργάστηκε η οικογένεια. Σε λειτουργία επεξεργασίας μπορείτε να σύρετε κάθε πινέζα στο ακριβές σημείο.",
        "<b>Ανατράφηκε από άλλον;</b> Ανοίξτε ένα άτομο και χρησιμοποιήστε το <b>Ανατράφηκε από</b> για να συνδέσετε τη θεία, τον παππού ή τον κηδεμόνα — εμφανίζεται με διακεκομμένη γραμμή.",
        "<b>Αποθηκεύεται για όλους.</b> Οι αλλαγές αποθηκεύονται αυτόματα, ώστε όλοι να βλέπουν το πιο πρόσφατο δέντρο."
      ],
      note:"Μοιραστείτε τον σύνδεσμο για προβολή. Δώστε τον κωδικό μόνο σε όσους θέλετε να μπορούν να επεξεργάζονται."
    }
  };
  var LEGEND_TYPES = ["born","baptism","raised","educated","military","worked","immigration","married","lived","died","burial","other"];
  var PLACE_TYPES  = ["baptism","raised","educated","military","worked","immigration","married","lived","died","burial","other"]; // "born" handled by the Birthplace field
  function typeLabel(t){ return T({born:"tBorn",baptism:"tBaptism",raised:"tRaised",educated:"tEducated",military:"tMilitary",worked:"tWorked",immigration:"tImmigration",married:"tMarried",lived:"tLived",died:"tDied",burial:"tBurial",other:"tOther"}[t]||"tOther"); }
  function typeColor(t){
    var v = getComputedStyle(document.documentElement).getPropertyValue("--"+t);
    return (v && v.trim()) || "#8a9599";
  }

  /* ================= Languages (second-language options) ================= */
  var LANGS={
    el:{tag:"ΕΛ",en:"Greek",native:"Ελληνικά",translit:true},
    es:{tag:"ES",en:"Spanish",native:"Español"},
    fr:{tag:"FR",en:"French",native:"Français"},
    it:{tag:"IT",en:"Italian",native:"Italiano"},
    de:{tag:"DE",en:"German",native:"Deutsch"},
    pt:{tag:"PT",en:"Portuguese",native:"Português"},
    pl:{tag:"PL",en:"Polish",native:"Polski"},
    tr:{tag:"TR",en:"Turkish",native:"Türkçe"},
    ru:{tag:"RU",en:"Russian",native:"Русский"},
    uk:{tag:"UK",en:"Ukrainian",native:"Українська"},
    ar:{tag:"ع",en:"Arabic",native:"العربية",rtl:true},
    he:{tag:"עב",en:"Hebrew",native:"עברית",rtl:true},
    zh:{tag:"中",en:"Chinese",native:"中文"},
    hi:{tag:"हि",en:"Hindi",native:"हिन्दी"}
  };

  /* ================= State ================= */
  var state = { title:{en:"Kazantzis",el:"Καζαντζής"}, people:{}, config:{secondLang:"el",mono:false}, version:0 };
  var lang = "en", selectedId = null, editingId = null, editMode = false;
  var passcode = "";
  var shareToken = "", shareRole = "none", shareEditToken = "", tokenFromUrl = false;
  var tx = {x:60,y:40,k:1};
  var hiddenTypes = {};

  try{ var s=JSON.parse(sessionStorage.getItem("kz_ui")||"null"); if(s){ if(s.lang)lang=s.lang; if(s.tx)tx=s.tx; } }catch(e){}
  try{ passcode = localStorage.getItem("kz_pass")||""; }catch(e){}
  // pick up a share token from the link (#k=… or ?k=…), remember it, then tidy the address bar
  (function(){
    var m=(location.hash||"").match(/[#&]k=([^&]+)/) || (location.search||"").match(/[?&]k=([^&]+)/);
    if(m&&m[1]){ shareToken=decodeURIComponent(m[1]); tokenFromUrl=true; try{ localStorage.setItem("kz_token",shareToken); }catch(e){} }
    else { try{ shareToken=localStorage.getItem("kz_token")||""; }catch(e){} }
  })();
  function stripTokenFromUrl(){ if(!tokenFromUrl)return; tokenFromUrl=false;
    // NB: window.history — a local `var history` (undo/redo stack) shadows it in this closure
    try{ window.history.replaceState(null,"",location.pathname+location.search); }catch(e){} }
  // --- Account mode (multi-tenant): activated by ?id=t_... in the URL. When OFF, everything below
  // behaves exactly as the legacy single-tree app (passcode / share-token) — zero change for the family. ---
  var treeId="", accountMode=false;
  (function(){ var m=(location.search||"").match(/[?&]id=(t_[A-Za-z0-9_-]+)/); if(m){ treeId=m[1]; accountMode=true; } })();
  function treeEndpoint(){ return accountMode ? ("/api/tree-doc?id="+encodeURIComponent(treeId)) : "/api/tree"; }
  function authPayload(){ if(accountMode){ return shareEditToken ? {editToken:shareEditToken} : {session:true}; }
    if(passcode) return {passcode:passcode}; if(shareEditToken) return {editToken:shareEditToken}; return null; }

  function saveUI(){ try{ sessionStorage.setItem("kz_ui",JSON.stringify({lang:lang,tx:tx})); }catch(e){} }
  function cfg(){ if(!state.config)state.config={secondLang:"el",mono:false}; if(!LANGS[state.config.secondLang])state.config.secondLang="el"; return state.config; }
  function secondLangInfo(){ return LANGS[cfg().secondLang]||LANGS.el; }
  function isMono(){ return !!cfg().mono; }
  function hasTranslit(){ return !isMono() && !!secondLangInfo().translit; }
  function secondNameLabel(){ var sl=secondLangInfo(); if(sl.translit&&cfg().secondLang==="el") return T("nameEl"); return "Name ("+sl.native+" · "+sl.en+")"; }
  // UI chrome is Greek only for a Greek-second-language tree; other second languages keep an English UI.
  function T(k){ var ui=(lang==="el"&&cfg().secondLang==="el")?"el":"en"; return STR[ui][k]; }
  function uid(){ return "p_"+Date.now().toString(36)+Math.floor(Math.random()*46656).toString(36); }
  function isNum(n){ return typeof n==="number" && isFinite(n); }
  function esc(s){ return (s||"").replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];}); }

  function newPerson(extra){
    var o={id:uid(),nameEn:"",nameEl:"",nick:"",maiden:"",sex:"",birth:"",death:"",place:"",placeLat:null,placeLng:null,notes:"",source:"",photo:"",media:[],places:[],parents:[],partners:[],guardians:[],x:null,y:null};
    if(extra){ for(var k in extra) o[k]=extra[k]; }
    return o;
  }
  // ---- partnerships (multiple spouses) ----
  function partnersOf(p){ return (p&&p.partners)?p.partners:[]; }
  function arePartners(a,b){ return !!(P(a) && (P(a).partners||[]).indexOf(b)>-1); }
  function linkPartners(a,b){ if(!P(a)||!P(b)||a===b)return;
    P(a).partners=P(a).partners||[]; P(b).partners=P(b).partners||[];
    if(P(a).partners.indexOf(b)<0)P(a).partners.push(b);
    if(P(b).partners.indexOf(a)<0)P(b).partners.push(a); }
  function unlinkPartners(a,b){ if(P(a)&&P(a).partners)P(a).partners=P(a).partners.filter(function(x){return x!==b;});
    if(P(b)&&P(b).partners)P(b).partners=P(b).partners.filter(function(x){return x!==a;}); }
  // migrate old single-partner data + guarantee arrays
  function normalizePeople(){ Object.keys(state.people).forEach(function(k){ var p=state.people[k];
    if(!p.partners) p.partners=[];
    if(p.partner){ if(P(p.partner)&&p.partners.indexOf(p.partner)<0) p.partners.push(p.partner); delete p.partner; }
    if(!p.parents)p.parents=[]; if(!p.guardians)p.guardians=[]; if(!p.places)p.places=[]; if(!p.media)p.media=[];
    if(p.sex===undefined)p.sex=""; if(p.nick===undefined)p.nick=""; if(p.source===undefined)p.source="";
  }); }
  var TRANSLIT_ICON='<svg viewBox="0 0 24 24" fill="none"><path d="M7 7h11M14 4l4 3-4 3M17 17H6M10 20l-4-3 4-3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  var ICON = {
    audio:'<svg viewBox="0 0 24 24" fill="none"><path d="M9 17V6l10-2v9" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><circle cx="6.5" cy="17.5" r="2.4" stroke="currentColor" stroke-width="1.7"/><circle cx="16.5" cy="15.5" r="2.4" stroke="currentColor" stroke-width="1.7"/></svg>',
    video:'<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="13" height="12" rx="2.2" stroke="currentColor" stroke-width="1.7"/><path d="M16 10.2l5-2.7v9l-5-2.7" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
    link:'<svg viewBox="0 0 24 24" fill="none"><path d="M10.5 13.5a3.5 3.5 0 004.9.1l2.6-2.6a3.5 3.5 0 00-4.9-4.9l-1 .9M13.5 10.5a3.5 3.5 0 00-4.9-.1l-2.6 2.6a3.5 3.5 0 004.9 4.9l1-.9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
    image:'<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1.7"/><circle cx="8.5" cy="10" r="1.6" stroke="currentColor" stroke-width="1.5"/><path d="M4 17l5-4 4 3 3-2 4 3" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>'
  };

  var $ = function(id){ return document.getElementById(id); };
  function P(id){ return state.people[id]; }
  function persons(){ return Object.keys(state.people).map(function(k){return state.people[k];}); }

  function nameFor(p, l){
    if(isMono()) return {primary:(p.nameEn||"").trim(), secondary:""};
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

  /* ================= Name translation (best-guess suggestions) ================= */
  var NAME_EN2EL = {
    matthew:"Ματθαίος", michael:"Μιχαήλ", luke:"Λουκάς", thomas:"Θωμάς", christine:"Χριστίνα", christina:"Χριστίνα",
    george:"Γεώργιος", john:"Ιωάννης", maria:"Μαρία", mary:"Μαρία", helen:"Ελένη", eleni:"Ελένη",
    nick:"Νίκος", nicholas:"Νικόλαος", nikos:"Νίκος", sofia:"Σοφία", sophia:"Σοφία", anna:"Άννα", anne:"Άννα", annie:"Άννα",
    dimitris:"Δημήτρης", dimitri:"Δημήτρης", jim:"Δημήτρης", james:"Ιάκωβος", peter:"Πέτρος", paul:"Παύλος",
    andrew:"Ανδρέας", andreas:"Ανδρέας", stephen:"Στέφανος", steven:"Στέφανος", steve:"Στέφανος",
    catherine:"Αικατερίνη", katherine:"Αικατερίνη", katerina:"Κατερίνα", kate:"Κατερίνα", elizabeth:"Ελισάβετ",
    william:"Βασίλειος", bill:"Βασίλειος", robert:"Ροβέρτος", david:"Δαβίδ", alexander:"Αλέξανδρος", alex:"Αλέξανδρος",
    constantine:"Κωνσταντίνος", costas:"Κώστας", kostas:"Κώστας", christos:"Χρήστος", chris:"Χρήστος",
    angela:"Αγγελική", angeliki:"Αγγελική", irene:"Ειρήνη", eirini:"Ειρήνη", vasilis:"Βασίλης", basil:"Βασίλειος",
    spiros:"Σπύρος", spyros:"Σπύρος", yiannis:"Γιάννης", giannis:"Γιάννης", john_gr:"Γιάννης",
    theodore:"Θεόδωρος", ted:"Θεόδωρος", thodoris:"Θοδωρής", panagiotis:"Παναγιώτης", panos:"Πάνος",
    stella:"Στέλλα", despina:"Δέσποινα", evangelia:"Ευαγγελία", evangelos:"Ευάγγελος", vangelis:"Βαγγέλης",
    marina:"Μαρίνα", victoria:"Βικτωρία", joseph:"Ιωσήφ", samuel:"Σαμουήλ", daniel:"Δανιήλ",
    emmanuel:"Εμμανουήλ", manolis:"Μανώλης", charalambos:"Χαράλαμπος", athanasios:"Αθανάσιος", thanasis:"Θανάσης",
    grigoris:"Γρηγόρης", gregory:"Γρηγόριος", isabella:"Ισαβέλλα", joanna:"Ιωάννα", ioanna:"Ιωάννα",
    penelope:"Πηνελόπη", alexandra:"Αλεξάνδρα", zoe:"Ζωή", chloe:"Χλόη", kyriakos:"Κυριάκος", savvas:"Σάββας",
    fotis:"Φώτης", fotini:"Φωτεινή", effie:"Έφη", agapi:"Αγάπη", stavros:"Σταύρος", stavroula:"Σταυρούλα",
    lambros:"Λάμπρος", petros:"Πέτρος", markos:"Μάρκος", mark:"Μάρκος", frank:"Φραγκίσκος", michalis:"Μιχάλης"
  };
  var NAME_EL2EN = (function(){ var m={}; for(var k in NAME_EN2EL){ var g=NAME_EN2EL[k]; var key=stripGk(g); if(!m[key]) m[key]=cap(k.replace(/_gr$/,"")); } return m; })();

  function stripGk(s){ try{ return s.normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase(); }catch(e){ return s.toLowerCase(); } }
  function cap(s){ return s ? s.charAt(0).toUpperCase()+s.slice(1) : s; }
  function capGk(s){ return s ? s.charAt(0).toUpperCase()+s.slice(1) : s; }

  function translitEnToEl(w){
    var s=w.toLowerCase(), out="", i=0;
    var di={ th:"θ", ch:"χ", ph:"φ", ps:"ψ", ou:"ου", tz:"τζ", ts:"τσ", gk:"γκ", mp:"μπ", nt:"ντ", ee:"ι", oo:"ου" };
    var mono={ a:"α", b:"β", c:"κ", d:"ντ", e:"ε", f:"φ", g:"γ", h:"", i:"ι", j:"τζ", k:"κ", l:"λ", m:"μ", n:"ν", o:"ο", p:"π", q:"κ", r:"ρ", s:"σ", t:"τ", u:"ου", v:"β", w:"ου", x:"ξ", y:"ι", z:"ζ" };
    while(i<s.length){
      var two=s.substr(i,2);
      if(di[two]!==undefined){ out+=di[two]; i+=2; continue; }
      var c=s[i];
      out += (mono[c]!==undefined?mono[c]:c); i++;
    }
    out=out.replace(/σ$/,"ς");
    return capGk(out);
  }
  function translitElToEn(w){
    var s=stripGk(w), out="", i=0;
    var di={ "ου":"ou", "μπ":"b", "ντ":"d", "γκ":"g", "τζ":"tz", "τσ":"ts", "αι":"e", "ει":"i", "οι":"i", "αυ":"av", "ευ":"ev", "ος":"os" };
    var mono={ "α":"a","β":"v","γ":"g","δ":"d","ε":"e","ζ":"z","η":"i","θ":"th","ι":"i","κ":"k","λ":"l","μ":"m","ν":"n","ξ":"x","ο":"o","π":"p","ρ":"r","σ":"s","ς":"s","τ":"t","υ":"y","φ":"f","χ":"ch","ψ":"ps","ω":"o" };
    while(i<s.length){
      var two=s.substr(i,2);
      if(di[two]!==undefined){ out+=di[two]; i+=2; continue; }
      var c=s[i];
      out += (mono[c]!==undefined?mono[c]:c); i++;
    }
    return cap(out);
  }
  function toGreekName(en){
    if(!en) return "";
    return en.trim().split(/\s+/).map(function(w){
      var hit=NAME_EN2EL[w.toLowerCase()];
      return hit || translitEnToEl(w);
    }).join(" ");
  }
  function toLatinName(el){
    if(!el) return "";
    return el.trim().split(/\s+/).map(function(w){
      var hit=NAME_EL2EN[stripGk(w)];
      return hit || translitElToEn(w);
    }).join(" ");
  }
  // suggest the feminine form of a Greek surname
  function feminizeGreek(word){
    if(/ος$/.test(word)) return word.replace(/ος$/,"ου");
    if(/ής$/.test(word)) return word.replace(/ής$/,"ή");
    if(/ης$/.test(word)) return word.replace(/ης$/,"η");
    if(/άς$/.test(word)) return word.replace(/άς$/,"ά");
    if(/ας$/.test(word)) return word.replace(/ας$/,"α");
    return word;
  }

  /* ================= Layout ================= */
  var U=210, CH=106, COUPLE_GAP=28, SIB_GAP=42, GEN_GAP=62, PAD=40;
  function unitWidth(u){ return u.members.length===2 ? U*2+COUPLE_GAP : U; }
  function buildUnits(){
    var ps=persons(), visited={}, units=[], unitOf={};
    ps.forEach(function(p){ if(visited[p.id])return;
      var pr=partnersOf(p)[0];
      var members = (pr && P(pr) && !visited[pr]) ? [p.id,pr] : [p.id];
      var u={id:"u_"+members.join("_"),members:members}; units.push(u);
      members.forEach(function(m){visited[m]=1;unitOf[m]=u;}); });
    units.forEach(function(u){ var ms={}; u.members.forEach(function(m){ms[m]=1;});
      u.childPersonIds = ps.filter(function(pp){return (pp.parents||[]).some(function(pid){return ms[pid];});}).map(function(pp){return pp.id;}); });
    return {units:units,unitOf:unitOf};
  }
  function birthKey(u){ var y=Infinity; u.members.forEach(function(m){ var p=P(m); var b=p&&parseInt((p.birth||"").match(/\d{4}/)||[],10); if(b&&b<y)y=b; }); return y; }
  function sortUnits(list){ return list.slice().sort(function(a,b){ var ka=birthKey(a),kb=birthKey(b); if(ka!==kb)return ka-kb; return a.id<b.id?-1:1; }); }
  function childUnitsOf(u,unitOf){ var seen={},out=[]; (u.childPersonIds||[]).forEach(function(cid){var cu=unitOf[cid]; if(cu&&!seen[cu.id]){seen[cu.id]=1;out.push(cu);}}); return sortUnits(out); }
  function computeLayout(){
    var bu=buildUnits(), units=bu.units, unitOf=bu.unitOf, placed={};
    var roots=units.filter(function(u){return u.members.every(function(m){var par=P(m).parents||[];return !par.some(function(pid){return P(pid);});});});
    if(roots.length===0) roots=units.slice();
    roots=sortUnits(roots);
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
  /* ---- freeform positions ---- */
  function autoArrange(save){ if(save)pushUndo(); var layout=computeLayout();
    layout.units.forEach(function(u){ u.members.forEach(function(mid,i){ var p=P(mid); if(!p)return; p.x=u.x+(i===1?U+COUPLE_GAP:0); p.y=u.y; }); });
    if(save){ scheduleSave(true); } }
  function ensurePositions(){ var ps=persons();
    var placed=ps.filter(function(p){return isNum(p.x)&&isNum(p.y);});
    var missing=ps.filter(function(p){return !(isNum(p.x)&&isNum(p.y));});
    if(!missing.length) return;
    if(!placed.length){ autoArrange(false); return; }
    var maxY=Math.max.apply(null, placed.map(function(p){return p.y;}).concat([PAD])); var x=PAD;
    missing.forEach(function(p){ p.x=x; p.y=maxY+CH+GEN_GAP; x+=U+SIB_GAP; }); }
  function canvasSize(){ var maxX=560,maxY=380; persons().forEach(function(p){ maxX=Math.max(maxX,(p.x||0)+U); maxY=Math.max(maxY,(p.y||0)+CH); }); return {w:maxX+PAD, h:maxY+PAD}; }
  function ctr(p){ return {x:p.x+U/2, y:p.y+CH/2}; }
  function curvePath(x1,y1,x2,y2){ var my=(y1+y2)/2; return "M "+x1+" "+y1+" C "+x1+" "+my+" "+x2+" "+my+" "+x2+" "+y2; }
  function hit(d, lt, a, b, a2){ return '<path class="w-hit" d="'+d+'" data-lt="'+lt+'" data-a="'+a+'" data-b="'+b+'"'+(a2?' data-a2="'+a2+'"':'')+'/>'; }
  function buildWires(){ var ps=persons(), lines=[], hits=[], pdone={};
    ps.forEach(function(p){ (p.partners||[]).forEach(function(pid){ if(!P(pid))return; var key=[p.id,pid].sort().join("_"); if(pdone[key])return; pdone[key]=1;
      var a=ctr(p), b=ctr(P(pid));
      var d='M '+a.x+' '+a.y+' L '+b.x+' '+b.y;
      lines.push('<line class="w-partner" x1="'+a.x+'" y1="'+a.y+'" x2="'+b.x+'" y2="'+b.y+'"/>');
      lines.push('<circle class="w-dot" cx="'+((a.x+b.x)/2)+'" cy="'+((a.y+b.y)/2)+'" r="3.2"/>');
      hits.push(hit(d,"partner",p.id,pid)); }); });
    ps.forEach(function(ch){ var par=(ch.parents||[]).filter(function(id){return P(id);}); if(!par.length)return; var c=ctr(ch);
      if(par.length===2 && arePartners(par[0],par[1])){ var a=ctr(P(par[0])), b=ctr(P(par[1])); var d=curvePath((a.x+b.x)/2,(a.y+b.y)/2,c.x,c.y);
        lines.push('<path class="w-pc" d="'+d+'"/>'); hits.push(hit(d,"pc",par[0],ch.id,par[1])); }
      else { par.forEach(function(pid){ var a=ctr(P(pid)); var d=curvePath(a.x,a.y,c.x,c.y);
        lines.push('<path class="w-pc" d="'+d+'"/>'); hits.push(hit(d,"pc",pid,ch.id)); }); } });
    ps.forEach(function(ch){ (ch.guardians||[]).forEach(function(gid){ if(!P(gid)||gid===ch.id)return; var a=ctr(P(gid)), c=ctr(ch); var d=curvePath(a.x,a.y,c.x,c.y);
      lines.push('<path class="w-guard" d="'+d+'"/>'); hits.push(hit(d,"guard",gid,ch.id)); }); });
    return lines.join("")+hits.join(""); }
  function drawWires(){ var sz=canvasSize(); wires.setAttribute("width",sz.w); wires.setAttribute("height",sz.h); wires.setAttribute("viewBox","0 0 "+sz.w+" "+sz.h); wires.innerHTML=buildWires(); if(tempLine) wires.appendChild(tempLine); }
  function cardEl(p){
    var nm=nameFor(p,lang), yr=yearsFor(p);
    var card=document.createElement("div"); card.className="card"+(p.id===selectedId?" sel":"")+(p.sex==="m"?" sex-m":p.sex==="f"?" sex-f":"")+(p.id===moveArmedId?" armed-move":"");
    card.style.left=p.x+"px"; card.style.top=p.y+"px"; card.setAttribute("tabindex","0"); card.setAttribute("data-id",p.id);
    var primaryHtml = nm.primary?'<div class="nm primary">'+esc(nm.primary)+'</div>':(nm.secondary?'<div class="nm primary empty">'+esc(nm.secondary)+'</div>':'<div class="nm primary empty">'+esc(T("newPerson"))+'</div>');
    var secondaryHtml=(nm.primary&&nm.secondary)?'<div class="nm secondary">'+esc(nm.secondary)+'</div>':'';
    var status=(!yr.dec&&p.birth)?'<span class="status live"></span>':'';
    var header='<div class="chead"><div class="avatar'+(yr.dec?' dec':'')+'">'+(p.photo?"":esc(initialOf(p)))+'</div><div class="cmeta">'+primaryHtml+secondaryHtml+'</div></div>';
    var media=p.media||[]; var na=media.filter(function(m){return m.kind==="audio";}).length, nv=media.filter(function(m){return m.kind==="video";}).length;
    var np=(p.places||[]).filter(function(x){return isNum(x.lat)&&isNum(x.lng);}).length+((isNum(p.placeLat)&&isNum(p.placeLng))?1:0);
    var chips=[]; if(na)chips.push('<span class="chip">'+ICON.audio+na+'</span>'); if(nv)chips.push('<span class="chip">'+ICON.video+nv+'</span>'); if(np)chips.push('<span class="chip pin" style="background:var(--brass)">'+pinSvg()+np+'</span>');
    var chipsHtml=chips.length?'<div class="chips">'+chips.join("")+'</div>':'';
    var yrsHtml=yr.txt?'<div class="yrs">'+(yr.dec?'<span class="dag">†</span>':'')+'<span>'+esc(yr.txt)+'</span></div>':'<div class="yrs"></div>';
    var foot=(yr.txt||chips.length)?'<div class="cfoot">'+yrsHtml+chipsHtml+'</div>':'';
    card.innerHTML=status+header+foot;
    if(p.photo){ var av=card.querySelector(".avatar"); if(av)av.style.backgroundImage='url("'+p.photo+'")'; }
    if(editMode){ var h=document.createElement("div"); h.className="link-handle"; h.setAttribute("data-id",p.id); h.title=T("linkTip"); card.appendChild(h); }
    return card;
  }
  function render(){
    ensurePositions();
    Array.prototype.slice.call(stage.querySelectorAll(".card")).forEach(function(n){n.remove();});
    emptyHero.hidden = persons().length>0;
    var sz=canvasSize(); stage.style.width=sz.w+"px"; stage.style.height=sz.h+"px";
    drawWires();
    persons().forEach(function(p){ stage.appendChild(cardEl(p)); });
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
    if($("viewTapLbl"))$("viewTapLbl").textContent=T("viewTapestry");
    if($("tapExportLbl"))$("tapExportLbl").textContent=T("tapExport");
    if($("tapHint"))$("tapHint").textContent=T("tapHint");
    if($("tapDlPng"))$("tapDlPng").textContent=T("tapPng");
    if($("tapDlSvg"))$("tapDlSvg").textContent=T("tapSvg");
    if($("tapDoPrint"))$("tapDoPrint").textContent=T("tapPrint");
    var _lsg=$("langSeg"); if(_lsg)_lsg.style.display=isMono()?"none":"";
    $("langEl").textContent=secondLangInfo().tag; $("langEl").setAttribute("lang",cfg().secondLang);
    $("langEl").setAttribute("aria-pressed",lang==="el"); $("langEn").setAttribute("aria-pressed",lang==="en");
    $("ehTitle").textContent=T("ehTitle"); $("ehText").textContent=T("ehText"); $("ehAdd").textContent=T("ehAdd");
    $("roText").textContent=T("readonly"); $("delLbl").textContent=T("del"); $("saveBtn").textContent=T("save");
    if($("moveLbl"))$("moveLbl").textContent=T("moveCard");
    if($("undoBtn"))$("undoBtn").setAttribute("aria-label",T("undoLbl"));
    if($("redoBtn"))$("redoBtn").setAttribute("aria-label",T("redoLbl"));
    if(typeof updateUndoBtns==="function")updateUndoBtns();
    $("editLbl").textContent=editMode?T("editUnlocked"):T("editLocked");
    $("mtPersonLbl").textContent=T("showPerson"); $("mtLegendLbl").textContent=T("lifeEvents");
    var ap=$("mapAddPin"); if(ap)ap.textContent=T(mapAddMode?"addPlaceExit":"addPlaceMap");
    var si=$("searchInput"); if(si)si.placeholder=T("searchPh");
    if($("shareLbl2"))$("shareLbl2").textContent=T("shareBtn");
    if($("openShare"))$("openShare").setAttribute("title",T("shareTitle"));
    if($("openSettings")){ $("openSettings").setAttribute("aria-label",T("setTitle")); $("openSettings").setAttribute("title",T("setTitle")); }
    if($("dlBackup"))$("dlBackup").textContent=T("backupJson");
    if($("dlGedcom"))$("dlGedcom").textContent=T("exportGed");
    if($("doRestore"))$("doRestore").textContent=T("restoreJson");
  }

  /* ================= Undo / Redo history ================= */
  var history={undo:[],redo:[]}, applyingHistory=false, pushedThisTick=false, editorBaseSnap=null;
  function cloneState(){ return JSON.parse(JSON.stringify({title:state.title,people:state.people})); }
  function pushUndo(snap){ if(applyingHistory||pushedThisTick)return; pushedThisTick=true;
    history.undo.push(snap||cloneState()); if(history.undo.length>80)history.undo.shift(); history.redo.length=0; updateUndoBtns();
    setTimeout(function(){ pushedThisTick=false; },0); }
  function applySnap(s){ if(!s)return; state.title=s.title||state.title; state.people=s.people||{}; normalizePeople(); }
  function afterHistory(){ selectedId=null; moveArmedId=null; setMoveHint(false); if(typeof closeDrawer==="function")closeDrawer();
    render(); if(document.body.classList.contains("mapview"))renderMap();
    if(document.body.classList.contains("tapestryview"))renderTapestry(); updateUndoBtns(); }
  function doUndo(){ if(!history.undo.length)return; applyingHistory=true;
    history.redo.push(cloneState()); applySnap(history.undo.pop()); afterHistory(); scheduleSave(true); applyingHistory=false; toast(T("undone")); }
  function doRedo(){ if(!history.redo.length)return; applyingHistory=true;
    history.undo.push(cloneState()); applySnap(history.redo.pop()); afterHistory(); scheduleSave(true); applyingHistory=false; toast(T("redone")); }
  function updateUndoBtns(){ var u=$("undoBtn"), r=$("redoBtn"); if(u)u.disabled=!history.undo.length; if(r)r.disabled=!history.redo.length; }

  /* ================= Mutations ================= */
  function px(p){ return isNum(p&&p.x)?p.x:0; }
  function py(p){ return isNum(p&&p.y)?p.y:0; }
  function addFirst(){ pushUndo(); var c=viewCenterCanvas(); var np=newPerson({x:c.x-U/2,y:c.y-CH/2}); state.people[np.id]=np; openEditor(np.id,true); }
  function addPersonCentered(){ pushUndo(); var c=viewCenterCanvas(); var np=newPerson({x:c.x-U/2,y:c.y-CH/2}); state.people[np.id]=np; openEditor(np.id,true); }
  function addChild(pid){ pushUndo(); var p=P(pid); var pr=partnersOf(p)[0]; var parents=(pr&&P(pr))?[pid,pr]:[pid]; var np=newPerson({parents:parents,x:px(p),y:py(p)+CH+GEN_GAP}); state.people[np.id]=np; openEditor(np.id,true); }
  function addSibling(pid){ pushUndo(); var p=P(pid); var np=newPerson({parents:(p.parents||[]).slice(),x:px(p)+U+SIB_GAP,y:py(p)}); state.people[np.id]=np; openEditor(np.id,true); }
  function addPartner(pid){ pushUndo(); var p=P(pid); var off=(partnersOf(p).length)*(CH+18); var np=newPerson({x:px(p)+U+COUPLE_GAP,y:py(p)+off}); state.people[np.id]=np; linkPartners(pid,np.id); openEditor(np.id,true); }
  function addParent(pid){ pushUndo(); var p=P(pid); var existing=(p.parents||[]).filter(function(x){return P(x);});
    if(existing.length>=2){openEditor(existing[0],false);return;}
    var np, id;
    if(existing.length===1){ var other=existing[0]; np=newPerson({x:px(P(other))+U+COUPLE_GAP,y:py(P(other))}); id=np.id; state.people[id]=np; linkPartners(other,id); p.parents=[other,id]; }
    else { np=newPerson({x:px(p),y:py(p)-CH-GEN_GAP}); id=np.id; state.people[id]=np; p.parents=[id]; }
    render(); openEditor(id,true); }
  function removePerson(pid){ pushUndo(); delete state.people[pid];
    persons().forEach(function(pp){ if(pp.partners)pp.partners=pp.partners.filter(function(x){return x!==pid;});
      if(pp.parents)pp.parents=pp.parents.filter(function(x){return x!==pid;});
      if(pp.guardians)pp.guardians=pp.guardians.filter(function(x){return x!==pid;}); });
    selectedId=null; closeDrawer(); render(); scheduleSave(true); }

  /* ================= Editor ================= */
  var drawer=$("drawer"), scrim=$("scrim"), drawerBody=$("drawerBody");
  function fieldRow(label,id,val,cls,ph,textarea){
    var input=textarea?'<textarea id="'+id+'" class="'+(cls||"")+'">'+esc(val||"")+'</textarea>'
      :'<input id="'+id+'" class="'+(cls||"")+'" value="'+esc(val||"")+'"'+(ph?' placeholder="'+esc(ph)+'"':'')+' />';
    return '<div class="field"><label for="'+id+'">'+esc(label)+'</label>'+input+'</div>';
  }
  function mediaKindOptions(cur){ return ['video','audio','image','link'].map(function(k){var l=k==="video"?T("kVideo"):k==="audio"?T("kAudio"):k==="image"?T("kImage"):T("kLink");return '<option value="'+k+'"'+(cur===k?" selected":"")+'>'+esc(l)+'</option>';}).join(""); }
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
  function readPlaceRows(keepEmpty){ var arr=[]; var box=$("placeRows"); if(!box) return arr;
    box.querySelectorAll(".place-row").forEach(function(r){
    if(!r.querySelector(".pl-type")) return; // skip the birthplace row (shares the class, no type field)
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
  function shortPlaceLabel(j){ if(!j)return ""; var a=j.address||{};
    // prefer the most specific locality (e.g. "Model Village") then its parent (e.g. "Creswell"),
    // rather than jumping straight to the nearest town ("Bolsover").
    var local  = a.neighbourhood||a.hamlet||a.suburb||a.quarter||a.city_district||a.locality||a.residential||a.industrial||"";
    var place  = a.village||a.town||a.city||a.municipality||"";
    var region = a.county||a.state||a.region||"";
    var country= a.country||"";
    var parts=[];
    if(local) parts.push(local);
    if(place && place!==local) parts.push(place);
    if(!parts.length && region) parts.push(region);
    if(parts.length<2 && country && parts.indexOf(country)<0) parts.push(country); // add country for context when we only have one local level
    parts=parts.filter(function(v,i,arr){ return v && arr.indexOf(v)===i; }).slice(0,2);
    if(parts.length) return parts.join(", ");
    return j.display_name?j.display_name.split(",").slice(0,2).map(function(s){return s.trim();}).join(", "):""; }
  function reverseGeocode(lat,lng){
    var url="https://nominatim.openstreetmap.org/reverse?format=jsonv2&zoom=18&addressdetails=1&accept-language="+(lang==="el"?"el":"en")+"&lat="+lat+"&lon="+lng;
    return fetch(url,{headers:{"Accept":"application/json"}}).then(function(r){ return r.ok?r.json():null; }).then(shortPlaceLabel).catch(function(){ return ""; });
  }

  function currentGuardianList(){ var arr=[]; drawerBody.querySelectorAll("#guardChips [data-gid]").forEach(function(c){ arr.push(c.getAttribute("data-gid")); }); return arr; }
  function renderGuardians(list){
    var chips=$("guardChips"); if(!chips) return;
    chips.innerHTML=(list||[]).filter(function(id){return P(id);}).map(function(id){ var nm=nameFor(P(id),lang);
      return '<span class="gchip" data-gid="'+id+'">'+esc(nm.primary||nm.secondary||T("newPerson"))+'<button type="button" class="grm" aria-label="remove">✕</button></span>'; }).join("");
    chips.querySelectorAll(".grm").forEach(function(b){ b.addEventListener("click",function(){
      var gid=b.parentNode.getAttribute("data-gid");
      renderGuardians(currentGuardianList().filter(function(x){return x!==gid;})); }); });
    var sel=$("guardSel"); if(sel){ var used={}; (list||[]).forEach(function(x){used[x]=1;}); if(editingId)used[editingId]=1;
      var opts='<option value="">'+esc(T("chooseGuardian"))+'</option>';
      persons().filter(function(p){return !used[p.id];}).forEach(function(p){ var nm=nameFor(p,lang);
        opts+='<option value="'+p.id+'">'+esc(nm.primary||nm.secondary||T("newPerson"))+'</option>'; });
      sel.innerHTML=opts; }
  }

  function childrenOf(pid){ return persons().filter(function(pp){ return (pp.parents||[]).indexOf(pid)>-1; }); }
  function renderFamNow(pid){
    var box=$("famNow"); if(!box)return; var p=P(pid); if(!p)return;
    function chip(id,kind){ return '<span class="rel-chip" data-id="'+id+'" data-kind="'+kind+'">'+esc(nameOf(id))+'<button type="button" class="rx" aria-label="remove">✕</button></span>'; }
    var none='<span class="none">'+esc(T("noneYet"))+'</span>';
    var parents=(p.parents||[]).filter(function(id){return P(id);});
    var prs=(p.partners||[]).filter(function(id){return P(id);});
    var kids=childrenOf(pid);
    var h='';
    h+='<div class="fam-row"><span class="fk">'+esc(T("curParents"))+'</span><span class="fv">'+(parents.length?parents.map(function(id){return chip(id,"parent");}).join(""):none)+'</span></div>';
    h+='<div class="fam-row"><span class="fk">'+esc(T("curPartner"))+'</span><span class="fv">'+(prs.length?prs.map(function(id){return chip(id,"partner");}).join(""):none)+'</span></div>';
    h+='<div class="fam-row"><span class="fk">'+esc(T("curChildren"))+'</span><span class="fv">'+(kids.length?kids.map(function(k){return chip(k.id,"child");}).join(""):none)+'</span></div>';
    box.innerHTML=h;
    box.querySelectorAll(".rx").forEach(function(bt){ bt.addEventListener("click",function(){
      var c=bt.parentNode, id=c.getAttribute("data-id"), kind=c.getAttribute("data-kind"), pp=P(editingId); if(!pp)return;
      pushUndo();
      if(kind==="parent"){ if(pp.parents)pp.parents=pp.parents.filter(function(x){return x!==id;}); }
      else if(kind==="partner"){ unlinkPartners(editingId,id); }
      else if(kind==="child"){ var ch=P(id); if(ch&&ch.parents)ch.parents=ch.parents.filter(function(x){return x!==editingId;}); }
      renderFamNow(editingId); render(); scheduleSave(true);
    }); });
  }

  function openEditor(pid,isNew){
    var p=P(pid); if(!p) return;
    editorBaseSnap = isNew ? null : cloneState();
    editingId=pid; selectedId=pid; $("drawerFoot").style.display="";
    var nm=nameFor(p,lang); $("drawerTitle").textContent=nm.primary||nm.secondary||T("newPerson");
    var html="";
    html+='<div class="photo-edit"><div class="photo-thumb" id="ph_thumb">'+(p.photo?"":esc(initialOf(p)))+'</div>'+
      '<div class="photo-actions"><button type="button" class="mini" id="ph_pick">'+esc(T("addPhoto"))+'</button>'+
      '<button type="button" class="mini ghost" id="ph_rm" '+(p.photo?"":'style="display:none"')+'>'+esc(T("removePhoto"))+'</button></div>'+
      '<input type="file" accept="image/*" id="ph_file" style="display:none" /></div>';
    var _sl=secondLangInfo();
    if(!isMono()){
      html+='<div class="field"><label class="lblrow" for="f_el">'+esc(secondNameLabel())+
        (_sl.translit?'<button type="button" class="translit" data-to="el">'+TRANSLIT_ICON+esc(T("trFromEn"))+'</button>':'')+'</label>'+
        '<input id="f_el" class="el" dir="auto" value="'+esc(p.nameEl||"")+'" placeholder="'+esc(_sl.translit?T("placeholderEl"):_sl.native)+'" /></div>';
    }
    html+='<div class="field"><label class="lblrow" for="f_en">'+esc(T("nameEn"))+
      (hasTranslit()?'<button type="button" class="translit" data-to="en">'+TRANSLIT_ICON+esc(T("trFromEl"))+'</button>':'')+'</label>'+
      '<input id="f_en" value="'+esc(p.nameEn||"")+'" placeholder="'+esc(T("placeholderEn"))+'" /></div>';
    html+='<div class="two">'+fieldRow(T("nick"),"f_nick",p.nick,"","",false)+
      '<div class="field"><label for="f_sex">'+esc(T("sexLabel"))+'</label><select id="f_sex" class="sel">'+
        '<option value=""'+(!p.sex?" selected":"")+'>'+esc(T("sexU"))+'</option>'+
        '<option value="m"'+(p.sex==="m"?" selected":"")+'>'+esc(T("sexM"))+'</option>'+
        '<option value="f"'+(p.sex==="f"?" selected":"")+'>'+esc(T("sexF"))+'</option></select></div></div>';
    html+=fieldRow(T("maiden"),"f_maiden",p.maiden,"","",false);
    html+='<div class="two">'+fieldRow(T("born"),"f_birth",p.birth,"","e.g. 1948 or 22/03/1948",false)+fieldRow(T("died"),"f_death",p.death,"","",false)+'</div>';
    var hasBp=isNum(p.placeLat)&&isNum(p.placeLng);
    html+='<div class="field"><label for="f_place">'+esc(T("place"))+'</label>'+
      '<div class="place-row" id="bpRow"'+(hasBp?' data-lat="'+p.placeLat+'" data-lng="'+p.placeLng+'"':'')+'>'+
        '<div class="pr-find"><input class="pl-label" id="f_place" value="'+esc(p.place||"")+'" placeholder="'+esc(T("placeName"))+'" />'+
          '<button type="button" class="btn findbtn" id="bpFind">'+esc(T("findPlace"))+'</button></div>'+
        '<div class="coordtag'+(hasBp?' set':'')+'"><span class="ct-ic">'+(hasBp?'📍':'○')+'</span><span class="ct-txt">'+esc(hasBp?T("coordSet"):T("coordNone"))+'</span></div>'+
        '<div class="geo-results"></div></div></div>';
    html+=fieldRow(T("notes"),"f_notes",p.notes,"","",true);
    html+=fieldRow(T("source"),"f_source",p.source,"","",true);
    html+='<div class="sec-title">'+esc(T("places"))+'</div><div id="placeRows"></div><button type="button" class="btn add-row" id="addPlace">'+esc(T("addPlace"))+'</button>';
    html+='<div class="sec-title">'+esc(T("mediaLinks"))+'</div><div id="mediaRows"></div><button type="button" class="btn add-row" id="addMedia">'+esc(T("addMediaLink"))+'</button>';
    html+='<div class="sec-title">'+esc(T("relations"))+'</div>';
    html+='<div class="fam-now" id="famNow"></div>';
    html+='<div class="rel-grid">'+
      '<button class="btn" data-rel="parent">'+esc(T("addParent"))+'</button><button class="btn" data-rel="partner">'+esc(T("addPartner"))+'</button>'+
      '<button class="btn" data-rel="child">'+esc(T("addChild"))+'</button><button class="btn" data-rel="sibling">'+esc(T("addSibling"))+'</button></div>';
    html+='<div class="sec-title">'+esc(T("raisedBy"))+'</div><div id="guardChips" class="guard-chips"></div>'+
      '<div class="guard-add"><select id="guardSel"></select><button type="button" class="btn" id="guardAdd">'+esc(T("addGuardian"))+'</button></div>';
    drawerBody.innerHTML=html; drawerBody.scrollTop=0;
    renderMediaRows(p.media||[]); renderPlaceRows(p.places||[]); renderGuardians(p.guardians||[]); renderFamNow(pid);
    $("guardAdd").addEventListener("click",function(){ var sel=$("guardSel"); if(!sel.value)return; var l=currentGuardianList(); if(l.indexOf(sel.value)<0)l.push(sel.value); renderGuardians(l); });
    if(p.photo) $("ph_thumb").style.backgroundImage='url("'+p.photo+'")';

    $("ph_pick").addEventListener("click",function(){ $("ph_file").click(); });
    $("ph_file").addEventListener("change",function(e){ var f=e.target.files&&e.target.files[0]; if(!f)return;
      downscale(f,function(d){ if(!d){toast(T("photoErr"));return;} P(editingId).photo=d; var th=$("ph_thumb"); th.textContent=""; th.style.backgroundImage='url("'+d+'")'; $("ph_rm").style.display=""; }); });
    $("ph_rm").addEventListener("click",function(){ P(editingId).photo=""; var th=$("ph_thumb"); th.style.backgroundImage=""; th.textContent=initialOf(P(editingId)); this.style.display="none"; });
    $("addMedia").addEventListener("click",function(){ var snap=readMediaRows(true); snap.push({kind:"video",label:"",url:""}); renderMediaRows(snap);
      var rows=$("mediaRows").querySelectorAll(".media-row"); var last=rows[rows.length-1]; if(last)last.querySelector(".m-url").focus(); });
    $("addPlace").addEventListener("click",function(){ var snap=readPlaceRows(true); snap.push({type:"lived",label:"",year:""}); renderPlaceRows(snap);
      var rows=$("placeRows").querySelectorAll(".place-row"); var last=rows[rows.length-1]; if(last)last.querySelector(".pl-label").focus(); });
    $("bpFind").addEventListener("click",function(){ doGeocode($("bpRow")); });
    drawerBody.querySelectorAll(".translit").forEach(function(b){ b.addEventListener("click",function(){
      var dir=b.getAttribute("data-to");
      if(dir==="el"){ var en=$("f_en").value.trim(); if(en){ var g=toGreekName(en); var sx=$("f_sex")?$("f_sex").value:"";
          if(sx==="f"){ var parts=g.split(" "); parts[parts.length-1]=feminizeGreek(parts[parts.length-1]); g=parts.join(" "); } $("f_el").value=g; } $("f_el").focus(); }
      else { var el=$("f_el").value.trim(); if(el) $("f_en").value=toLatinName(el); $("f_en").focus(); }
    }); });

    drawerBody.querySelectorAll("[data-rel]").forEach(function(b){ b.addEventListener("click",function(){ try{ commitFields(); }catch(e){ if(window.console)console.error(e); }
      var rel=b.getAttribute("data-rel");
      if(rel==="parent")addParent(editingId); else if(rel==="partner")addPartner(editingId); else if(rel==="child")addChild(editingId); else if(rel==="sibling")addSibling(editingId); }); });

    drawer.classList.add("open"); scrim.classList.add("open"); drawer.setAttribute("aria-hidden","false");
    render();
    setTimeout(function(){ var el=$((!isMono()&&lang==="el")?"f_el":"f_en"); if(el)el.focus(); },60);
  }

  function commitFields(){
    if(!editingId||!P(editingId)) return;
    var p=P(editingId), g=function(id){var el=$(id);return el?el.value:undefined;};
    if(g("f_el")!==undefined)p.nameEl=g("f_el").trim();
    if(g("f_en")!==undefined)p.nameEn=g("f_en").trim();
    if(g("f_maiden")!==undefined)p.maiden=g("f_maiden").trim();
    if(g("f_birth")!==undefined)p.birth=g("f_birth").trim();
    if(g("f_death")!==undefined)p.death=g("f_death").trim();
    if(g("f_nick")!==undefined)p.nick=g("f_nick").trim();
    if(g("f_sex")!==undefined)p.sex=g("f_sex");
    if(g("f_source")!==undefined)p.source=g("f_source").trim();
    if(g("f_place")!==undefined)p.place=g("f_place").trim();
    var bp=$("bpRow");
    if(bp){ var la=bp.getAttribute("data-lat"), lo=bp.getAttribute("data-lng");
      if(p.place && la!=null && la!==""){ p.placeLat=parseFloat(la); p.placeLng=parseFloat(lo); } else { p.placeLat=null; p.placeLng=null; } }
    if(g("f_notes")!==undefined)p.notes=g("f_notes").trim();
    if($("mediaRows")) p.media=readMediaRows(false);
    if($("placeRows")) p.places=readPlaceRows(false);
    if($("guardChips")) p.guardians=currentGuardianList();
  }
  function saveAndClose(){ if(editingId){ var base=editorBaseSnap; try{ commitFields(); }catch(e){ if(window.console)console.error(e); }
      if(base && JSON.stringify(base.people)!==JSON.stringify(state.people)) pushUndo(base); }
    editorBaseSnap=null; closeDrawer(); render(); scheduleSave(true); }
  function closeDrawer(){ drawer.classList.remove("open"); scrim.classList.remove("open"); drawer.setAttribute("aria-hidden","true"); editingId=null; }

  function pfield(k,v){ return '<div class="p-field"><div class="k">'+esc(k)+'</div><div class="v">'+esc(v)+'</div></div>'; }
  /* ================= Media embedding ================= */
  function normURL(u){ u=(u||"").trim(); if(!u)return""; if(/^https?:\/\//i.test(u))return u; if(/^\/\//.test(u))return"https:"+u; return"https://"+u; }
  function ytId(u){ var m=u.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/i); return m?m[1]:null; }
  function vimeoId(u){ var m=u.match(/vimeo\.com\/(?:video\/)?(\d+)/i); return m?m[1]:null; }
  function driveId(u){ if(!/drive\.google\.com|docs\.google\.com/i.test(u)) return null;
    var m=u.match(/\/file\/d\/([\w-]+)/) || u.match(/[?&]id=([\w-]+)/) || u.match(/\/d\/([\w-]+)/); return m?m[1]:null; }
  function spotifyEmbed(u){ var m=u.match(/open\.spotify\.com\/(track|episode|album|playlist|show)\/([A-Za-z0-9]+)/i); return m?"https://open.spotify.com/embed/"+m[1]+"/"+m[2]:null; }
  function isImg(u){ return /\.(jpe?g|png|gif|webp|avif|bmp|svg)(\?|#|$)/i.test(u); }
  function isVideoFile(u){ return /\.(mp4|webm|ogv|mov|m4v)(\?|#|$)/i.test(u); }
  function isAudioFile(u){ return /\.(mp3|m4a|aac|ogg|oga|wav|flac)(\?|#|$)/i.test(u); }
  function iframeHtml(src,cls){ return '<div class="m-embed'+(cls?" "+cls:"")+'"><iframe src="'+esc(src)+'" loading="lazy" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture;fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div>'; }
  function linkBtnHtml(url,m){ var ic=ICON[m.kind]||ICON.link; var lbl=m.label||(m.kind==="audio"?T("listen"):m.kind==="video"?T("watch"):m.kind==="image"?T("open"):T("open"));
    return '<a class="p-mediabtn" href="'+esc(url)+'" target="_blank" rel="noopener noreferrer"><span class="mi">'+ic+'</span><span class="ml">'+esc(lbl)+'</span><span class="go">↗</span></a>'; }
  function mediaItemHtml(m){
    var url=normURL(m.url); if(!url) return "";
    var cap=m.label?'<div class="m-cap">'+esc(m.label)+'</div>':"";
    var yt=ytId(url); if(yt) return '<div class="m-item">'+cap+iframeHtml("https://www.youtube.com/embed/"+yt+"?rel=0")+'</div>';
    var vi=vimeoId(url); if(vi) return '<div class="m-item">'+cap+iframeHtml("https://player.vimeo.com/video/"+vi)+'</div>';
    var gd=driveId(url); if(gd) return '<div class="m-item">'+cap+iframeHtml("https://drive.google.com/file/d/"+gd+"/preview")+'</div>';
    var sp=spotifyEmbed(url); if(sp) return '<div class="m-item">'+cap+iframeHtml(sp,"audio")+'</div>';
    if(/soundcloud\.com\//i.test(url)) return '<div class="m-item">'+cap+iframeHtml("https://w.soundcloud.com/player/?url="+encodeURIComponent(url)+"&color=%239a7b3f&visual=false&hide_related=true&show_comments=false","audio")+'</div>';
    if(isImg(url)||isGooglePhotoImg(url)||m.kind==="image") return '<div class="m-item">'+cap+'<img class="m-img" src="'+esc(url)+'" alt="'+esc(m.label||"")+'" loading="lazy" data-full="'+esc(url)+'"/></div>';
    if(isVideoFile(url)) return '<div class="m-item">'+cap+'<video class="m-file" src="'+esc(url)+'" controls preload="metadata" playsinline></video></div>';
    if(isAudioFile(url)) return '<div class="m-item">'+cap+'<audio class="m-file" src="'+esc(url)+'" controls preload="none"></audio></div>';
    return '<div class="m-item">'+linkBtnHtml(url,m)+'</div>';
  }
  // A Google Photos direct image (lh3.googleusercontent.com/…) works as an <img>; a shared *album* link does not embed.
  function isGooglePhotoImg(u){ return /\.googleusercontent\.com\//i.test(u) || /usercontent\.google\.com\//i.test(u); }
  function isKnownEmbed(u){ return !!(ytId(u)||vimeoId(u)||driveId(u)||spotifyEmbed(u)||/soundcloud\.com\//i.test(u)); }
  // A real video/audio/embed link is never treated as a photo, whatever type the person picked in the editor.
  function isImageMedia(m){ var u=normURL(m.url); if(!u) return false;
    if(isKnownEmbed(u)||isVideoFile(u)||isAudioFile(u)) return false;
    return isImg(u)||isGooglePhotoImg(u)||m.kind==="image"; }
  function galleryImgHtml(m){ var url=normURL(m.url);
    return '<figure class="gal-item"><img class="m-img" src="'+esc(url)+'" alt="'+esc(m.label||"")+'" loading="lazy" data-full="'+esc(url)+'"/>'+
      (m.label?'<figcaption>'+esc(m.label)+'</figcaption>':'')+'</figure>'; }
  function openLightbox(src){ var lb=$("lightbox"); if(!lb)return; lb.querySelector("img").src=src; lb.classList.add("open"); }
  function closeLightbox(){ var lb=$("lightbox"); if(!lb)return; lb.classList.remove("open"); lb.querySelector("img").src=""; }

  function openProfile(pid){
    var p=P(pid); if(!p)return; selectedId=pid; editingId=null; $("drawerFoot").style.display="none";
    var nm=nameFor(p,lang), yr=yearsFor(p);
    $("drawerTitle").textContent=nm.primary||nm.secondary||T("newPerson");
    var h='<div class="profile"><div class="p-photo'+(yr.dec?" dec":"")+'" id="prof_photo">'+(p.photo?"":esc(initialOf(p)))+'</div>';
    h+='<div class="p-name">'+esc(nm.primary||nm.secondary||T("newPerson"))+'</div>';
    if(nm.primary&&nm.secondary) h+='<div class="p-alt">'+esc(nm.secondary)+'</div>';
    if(p.nick) h+='<div class="p-alt">"'+esc(p.nick)+'"</div>';
    var dp=[]; if(p.birth)dp.push(T("born")+" "+p.birth); if(p.death)dp.push(T("died")+" "+p.death);
    if(dp.length) h+='<div class="p-dates">'+(yr.dec?"† ":"")+esc(dp.join("   ·   "))+'</div>';
    if(p.maiden) h+=pfield(T("maiden"),p.maiden);
    if(p.notes) h+=pfield(T("notes"),p.notes);
    if(p.source) h+=pfield(T("source"),p.source);
    var locs=[];
    if(p.place||(isNum(p.placeLat)&&isNum(p.placeLng))) locs.push({type:"born",label:p.place||"",year:p.birth||""});
    (p.places||[]).forEach(function(x){ if(x.label||(isNum(x.lat)&&isNum(x.lng))) locs.push(x); });
    if(locs.length){ h+='<div class="p-field"><div class="k">'+esc(T("lifeEvents"))+'</div><div class="p-places">';
      locs.forEach(function(pl){ h+='<div class="p-place"><span class="sw" style="background:'+typeColor(pl.type)+'"></span>'+
        '<span class="pt">'+esc(typeLabel(pl.type))+'</span><span class="pl">'+esc(pl.label||"")+'</span>'+(pl.year?'<span class="py">'+esc(pl.year)+'</span>':'')+'</div>'; });
      h+='</div></div>'; }
    var gs=(p.guardians||[]).filter(function(id){return P(id);});
    if(gs.length){ h+=pfield(T("raisedBy"), gs.map(function(id){var nm=nameFor(P(id),lang);return nm.primary||nm.secondary||T("newPerson");}).join(", ")); }
    var media=(p.media||[]).filter(function(m){ return normURL(m.url); });
    if(media.length){
      var gimgs=media.filter(isImageMedia), rest=media.filter(function(m){ return !isImageMedia(m); });
      h+='<div class="p-media">';
      if(gimgs.length){ h+='<div class="m-gallery'+(gimgs.length===1?' one':'')+'">'+gimgs.map(galleryImgHtml).join('')+'</div>'; }
      rest.forEach(function(m){ h+=mediaItemHtml(m); });
      h+='</div>';
    }
    h+='</div>';
    drawerBody.innerHTML=h; drawerBody.scrollTop=0;
    if(p.photo){ var pp=$("prof_photo"); if(pp)pp.style.backgroundImage='url("'+p.photo+'")'; }
    drawer.classList.add("open"); scrim.classList.add("open"); drawer.setAttribute("aria-hidden","false"); render();
  }
  function openPerson(pid){ if(moveArmedId){ moveArmedId=null; setMoveHint(false); } if(editMode) openEditor(pid,false); else openProfile(pid); }

  /* ================= Save (API) ================= */
  var saveTimer=null, saving=false, pendingAgain=false;
  function setSaveInd(cls,txt){ var el=$("saveInd"); el.className="save-ind"+(cls?" "+cls:""); $("saveTxt").textContent=txt||""; }
  function scheduleSave(now){ if(saveTimer){clearTimeout(saveTimer);saveTimer=null;} if(now)doSave(); else saveTimer=setTimeout(doSave,1000); }
  // Last-write-wins save: we NEVER overwrite the on-screen tree with the server's
  // copy as a side effect of saving (that used to delete just-added people when the
  // storage layer returned a spurious version conflict). On any failure we keep the
  // local data and retry.
  function doSave(){
    var auth=authPayload();
    if(!editMode||!auth) return;
    if(saving){ pendingAgain=true; return; }
    saving=true; setSaveInd("saving",T("saving"));
    var body={data:{title:state.title,people:state.people,config:state.config}};
    if(auth.passcode)body.passcode=auth.passcode; if(auth.editToken)body.editToken=auth.editToken;
    fetch(treeEndpoint(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(body)})
    .then(function(r){ return r.json().then(function(j){return {status:r.status,j:j};}).catch(function(){return {status:r.status,j:{}};}); })
    .then(function(res){ saving=false;
      if(res.status===200&&res.j.ok){ state.version=res.j.version; setSaveInd("saved",T("saved")); if(pendingAgain){pendingAgain=false;doSave();} return; }
      if(res.status===401){ // credential no longer valid
        if(accountMode){ setEditMode(false); setSaveInd("",""); return; }
        if(passcode){ passcode=""; try{localStorage.removeItem("kz_pass");}catch(e){} setEditMode(false); openPasscode(); }
        else { shareEditToken=""; shareRole="view"; setEditMode(false); }
        setSaveInd("",""); return; }
      // Any other failure: keep the local tree intact and retry shortly. Never revert.
      setSaveInd("saving",T("saving")); pendingAgain=false; setTimeout(doSave, 1500); })
    .catch(function(){ saving=false; setSaveInd("offline",T("offline")); setTimeout(doSave, 2500); });
  }

  /* ================= Map ================= */
  var map=null, markerLayer=null, lineLayer=null, mapReady=false, glLayer=null;
  var MAPTILER_KEY="RJmza4KRo6MYEnDxc3A2"; // MapTiler client key (public by design; lock to the site's domain in the MapTiler dashboard)
  function mapKey(){ return ((cfg().maptilerKey||"").trim()) || MAPTILER_KEY; }
  function glMap(){ try{ return (glLayer&&glLayer.getMaplibreMap)?glLayer.getMaplibreMap():((glLayer&&glLayer._glMap)||null); }catch(e){ return null; } }
  // English → Latin/English labels everywhere; local mode → each place in its own language (multilingual).
  function applyMapLanguage(){
    var m=glMap(); if(!m||!m.getStyle) return;
    var expr=(lang==="en") ? ["coalesce",["get","name:en"],["get","name:latin"],["get","name"]] : ["get","name"];
    try{ var st=m.getStyle(); if(!st||!st.layers) return;
      st.layers.forEach(function(ly){ if(ly.type==="symbol"&&ly.layout&&ly.layout["text-field"]!==undefined){ try{ m.setLayoutProperty(ly.id,"text-field",expr); }catch(e){} } });
    }catch(e){}
  }
  function initMap(){ if(map)return;
    map=L.map("map",{zoomControl:false,worldCopyJump:true}).setView([39.2,22.0],5);
    L.control.zoom({position:"topright"}).addTo(map); // top-left is covered by the Show/Life-events panel
    // Always show the plain OSM map immediately so the map is NEVER blank.
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:'© OpenStreetMap contributors'}).addTo(map);
    // Then try the MapTiler vector map ON TOP, kept invisible until it truly loads; if it fails, OSM just stays.
    glLayer=null; var key=mapKey();
    if(key && typeof maplibregl!=="undefined" && L.maplibreGL){
      try{
        glLayer=L.maplibreGL({ style:"https://api.maptiler.com/maps/streets-v2/style.json?key="+encodeURIComponent(key),
          attribution:'© <a href="https://www.maptiler.com/copyright/">MapTiler</a> © OpenStreetMap contributors' });
        glLayer.addTo(map);
        var settled=false;
        var glCanvasEl=function(){ var m=glMap(); return (m&&m.getCanvas)?m.getCanvas():null; };
        var hide=function(){ var c=glCanvasEl(); if(c)c.style.opacity="0"; };
        hide(); setTimeout(hide,40);
        var succeed=function(){ if(settled)return; settled=true; var c=glCanvasEl(); if(c)c.style.opacity="1"; applyMapLanguage(); };
        var fail=function(){ if(settled)return; settled=true; try{ map.removeLayer(glLayer); }catch(e){} glLayer=null; };
        // NB: in this Leaflet setup MapLibre's full "load" event may never fire — "style.load" is the reliable
        // signal that MapTiler accepted the key and the style is ready. Don't fail on generic errors (a stray
        // glyph/tile error would kill a working map); only the timeout, if the style truly never loads (e.g. 403).
        var wire=function(){ var m=glMap(); if(!m) return false;
          m.on("styledata",applyMapLanguage);
          m.on("style.load",succeed);
          m.on("load",succeed);
          if(m.isStyleLoaded && m.isStyleLoaded()) succeed();
          return true; };
        if(!wire()){ var tries=0, iv=setInterval(function(){ if(wire()||++tries>25) clearInterval(iv); },60); }
        setTimeout(function(){ if(!settled) fail(); }, 6000);
      }catch(e){ glLayer=null; }
    }
    markerLayer=L.layerGroup().addTo(map); lineLayer=L.layerGroup().addTo(map); mapReady=true;
    map.on("click",onMapClick);
    // keep the direction arrows correctly angled as the map is zoomed/panned
    map.on("zoomend moveend",function(){ if(document.body.classList.contains("mapview")&&currentJourneyPf) drawJourney(currentJourneyPf); });
  }
  var mapAddMode=false;
  function setMapAdd(on){ mapAddMode=!!on; var b=$("mapAddPin"); if(b){ b.classList.toggle("armed",mapAddMode); b.textContent=T(mapAddMode?"addPlaceExit":"addPlaceMap"); }
    if(map&&map.getContainer){ map.getContainer().style.cursor=mapAddMode?"crosshair":""; } }
  function onMapClick(e){ if(!mapAddMode||!editMode){ return; }
    var pid=$("mapPerson").value; if(!pid||!P(pid)){ toast(T("pickPersonFirst")); return; }
    var la=e.latlng.lat, lo=e.latlng.lng; var pl={type:"lived",label:"",year:"",lat:la,lng:lo};
    pushUndo(); P(pid).places=P(pid).places||[]; P(pid).places.push(pl);
    setMapAdd(false); setSaveInd("saving",T("saving")); scheduleSave(true); renderMap();
    reverseGeocode(la,lo).then(function(lbl){ if(lbl){ pl.label=lbl; scheduleSave(true); toast(T("addressFound").replace("{a}",lbl)); if(document.body.classList.contains("mapview"))renderMap(); } }); }
  function pinIcon(color){ return L.divIcon({className:"kz-pin",html:'<span style="background:'+color+'"></span>',iconSize:[19,19],iconAnchor:[9,9],popupAnchor:[0,-9]}); }
  function placeItems(){ var items=[]; persons().forEach(function(p){
    if(isNum(p.placeLat)&&isNum(p.placeLng)) items.push({p:p,pl:{type:"born",label:p.place||"",year:p.birth||"",lat:p.placeLat,lng:p.placeLng},set:function(la,lo){p.placeLat=la;p.placeLng=lo;},setLabel:function(t){p.place=t;}});
    (p.places||[]).forEach(function(pl){ if(isNum(pl.lat)&&isNum(pl.lng)) items.push({p:p,pl:pl,set:function(la,lo){pl.lat=la;pl.lng=lo;},setLabel:function(t){pl.label=t;}}); }); }); return items; }
  function personHasPin(p){ return (isNum(p.placeLat)&&isNum(p.placeLng)) || (p.places||[]).some(function(x){return isNum(x.lat)&&isNum(x.lng);}); }
  function typeCounts(){ var c={}; LEGEND_TYPES.forEach(function(t){c[t]=0;}); placeItems().forEach(function(it){c[it.pl.type]=(c[it.pl.type]||0)+1;}); return c; }
  function renderMapPersonSelect(){
    var sel=$("mapPerson"), cur=sel.value;
    var opts='<option value="">'+esc(T("allPeople"))+'</option>';
    persons().filter(personHasPin)
      .sort(function(a,b){var na=nameFor(a,lang).primary||nameFor(a,lang).secondary||"";var nb=nameFor(b,lang).primary||nameFor(b,lang).secondary||"";return na.localeCompare(nb);})
      .forEach(function(p){ var nm=nameFor(p,lang); opts+='<option value="'+p.id+'">'+esc(nm.primary||nm.secondary||T("newPerson"))+'</option>'; });
    sel.innerHTML=opts; if(cur&&P(cur)) sel.value=cur;
  }
  function renderLegend(){ var counts=typeCounts(), box=$("legend"); box.innerHTML="";
    LEGEND_TYPES.forEach(function(t){ var b=document.createElement("button"); b.className=hiddenTypes[t]?"off":"";
      b.innerHTML='<span class="sw" style="background:'+typeColor(t)+'"></span>'+esc(typeLabel(t))+'<span class="ct">'+(counts[t]||0)+'</span>';
      b.addEventListener("click",function(){ hiddenTypes[t]=!hiddenTypes[t]; renderMap(); }); box.appendChild(b); }); }
  var currentJourneyPf=null;
  function journeyKey(pl){
    var m=(pl.year||"").toString().match(/\d{4}/); var y=m?parseInt(m[0],10):NaN;
    if(pl.type==="born") return -1e9+(isNaN(y)?0:y);            // always the start
    if(pl.type==="died"||pl.type==="burial") return 1e9+(isNaN(y)?0:y); // always the end
    return isNaN(y)?0:y;
  }
  function journeySeq(pf){
    var arr=placeItems().filter(function(it){return it.p.id===pf && isNum(it.pl.lat) && isNum(it.pl.lng);})
      .map(function(it,i){return {pl:it.pl,i:i};});
    arr.sort(function(a,b){ var ka=journeyKey(a.pl), kb=journeyKey(b.pl); return ka!==kb?ka-kb:a.i-b.i; });
    // collapse consecutive pins at the same coordinate so we don't draw zero-length arrows
    var out=[]; arr.forEach(function(x){ var last=out[out.length-1];
      if(last && last.lat===x.pl.lat && last.lng===x.pl.lng) return; out.push(x.pl); });
    return out;
  }
  function drawJourney(pf){
    currentJourneyPf=pf||null;
    if(!lineLayer) return;
    lineLayer.clearLayers();
    if(!pf) return;
    var seq=journeySeq(pf);
    if(seq.length<2) return;
    var lineC=(getComputedStyle(document.documentElement).getPropertyValue("--line")||"#b7a98a").trim();
    var pts=seq.map(function(x){return [x.lat,x.lng];});
    lineLayer.addLayer(L.polyline(pts,{color:lineC,weight:2.5,opacity:.9,dashArray:"3 6",lineCap:"round"}));
    // direction of travel: an arrowhead at each segment midpoint, pointing earlier -> later
    for(var i=0;i<seq.length-1;i++){
      var a=seq[i], b=seq[i+1];
      var pa=map.latLngToLayerPoint([a.lat,a.lng]), pb=map.latLngToLayerPoint([b.lat,b.lng]);
      var ang=Math.atan2(pb.y-pa.y, pb.x-pa.x)*180/Math.PI;
      var mid=[(a.lat+b.lat)/2,(a.lng+b.lng)/2];
      lineLayer.addLayer(L.marker(mid,{interactive:false,keyboard:false,icon:L.divIcon({className:"kz-arrow",
        html:'<span style="transform:rotate("+ang+"deg);border-left-color:'+lineC+'"></span>',iconSize:[16,16],iconAnchor:[8,8]})}));
    }
    // numbered stops, so the order over time reads at a glance
    seq.forEach(function(pl,idx){
      lineLayer.addLayer(L.marker([pl.lat,pl.lng],{interactive:false,keyboard:false,icon:L.divIcon({className:"kz-stop",
        html:String(idx+1),iconSize:[17,17],iconAnchor:[-7,20]})}));
    });
  }
  function renderMap(fit){
    initMap(); applyMapLanguage(); markerLayer.clearLayers(); lineLayer.clearLayers();
    renderMapPersonSelect();
    var dt=$("dragTip"); if(dt) dt.innerHTML='<svg class="di" viewBox="0 0 24 24" fill="none"><path d="M12 3v18M3 12h18M12 3l-3 3M12 3l3 3M12 21l-3-3M12 21l3-3M3 12l3-3M3 12l3 3M21 12l-3-3M21 12l-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg><span>'+esc(T("dragTip"))+'</span>';
    var pf=$("mapPerson").value;
    var items=placeItems().filter(function(it){ if(pf&&it.p.id!==pf)return false; if(hiddenTypes[it.pl.type])return false; return true; });
    var bounds=[];
    items.forEach(function(it){ var m=L.marker([it.pl.lat,it.pl.lng],{icon:pinIcon(typeColor(it.pl.type)),draggable:editMode,autoPan:true});
      var nm=nameFor(it.p,lang), nms=nm.primary||nm.secondary||T("newPerson");
      var sub=typeLabel(it.pl.type)+(it.pl.label?" · "+it.pl.label:"")+(it.pl.year?" · "+it.pl.year:"");
      m.bindPopup('<div class="kzpop"><div class="n">'+esc(nms)+'</div><div class="t">'+esc(sub)+'</div>'+
        '<button class="kzpop-btn" data-open="'+it.p.id+'">'+esc(T(editMode?"editDetails":"openDetails"))+'</button></div>');
      m.on("click",function(){ selectedId=it.p.id; });
      m.on("popupopen",function(ev){ var el=ev&&ev.popup&&ev.popup.getElement?ev.popup.getElement():null; if(!el)return;
        var btn=el.querySelector(".kzpop-btn"); if(btn)btn.addEventListener("click",function(){ var id=btn.getAttribute("data-open"); if(!P(id))return; if(editMode)openEditor(id,false); else openProfile(id); }); });
      if(editMode){ m.on("dragstart",function(){ pushUndo(); });
        m.on("dragend",function(){ var ll=m.getLatLng(); it.set(ll.lat,ll.lng); drawJourney($("mapPerson").value); setSaveInd("saving",T("saving")); scheduleSave(true);
        reverseGeocode(ll.lat,ll.lng).then(function(lbl){ if(lbl){ it.setLabel(lbl); scheduleSave(true); toast(T("addressFound").replace("{a}",lbl)); if(document.body.classList.contains("mapview"))renderMap(); } }); }); }
      markerLayer.addLayer(m); bounds.push([it.pl.lat,it.pl.lng]); });
    drawJourney(pf);
    renderLegend();
    // only auto-frame the pins on an explicit view change (opening the map, choosing a person) —
    // NOT after editing a pin, so dragging one keeps the current zoom/position.
    if(fit && bounds.length){ try{ map.fitBounds(bounds,{padding:[60,60],maxZoom:9}); }catch(e){} }
    setTimeout(function(){ map.invalidateSize(); },30);
  }

  /* ================= Pan / Zoom ================= */
  function clampK(k){ return Math.max(0.25,Math.min(2.2,k)); }
  function zoomAt(f,cx,cy){ var r=viewport.getBoundingClientRect(); var px=cx!=null?cx:r.width/2, py=cy!=null?cy:r.height/2;
    var k2=clampK(tx.k*f), g=k2/tx.k; tx.x=px-(px-tx.x)*g; tx.y=py-(py-tx.y)*g; tx.k=k2; applyTransform(); saveUI(); }
  function fit(){ ensurePositions(); var ps=persons(), r=viewport.getBoundingClientRect(), pad=80;
    if(!ps.length){ tx={x:60,y:40,k:1}; applyTransform(); saveUI(); return; }
    var minX=Infinity,minY=Infinity,maxX=-Infinity,maxY=-Infinity;
    ps.forEach(function(p){ minX=Math.min(minX,px(p)); minY=Math.min(minY,py(p)); maxX=Math.max(maxX,px(p)+U); maxY=Math.max(maxY,py(p)+CH); });
    var w=Math.max(maxX-minX,U), h=Math.max(maxY-minY,CH);
    var k=clampK(Math.min((r.width-pad)/w,(r.height-pad)/h,1.4));
    tx.k=k; tx.x=(r.width-w*k)/2 - minX*k; tx.y=Math.max(20,(r.height-h*k)/2) - minY*k; applyTransform(); saveUI(); }
  var panning=false,panStart=null;
  var ptrs={}, pinch=null;
  function ptrIds(){ return Object.keys(ptrs); }
  function ptrDist(a,b){ return Math.hypot(a.x-b.x,a.y-b.y); }
  viewport.addEventListener("pointerdown",function(e){ if(e.target.closest(".card")||e.target.closest(".zoom")||e.target.closest(".status-pill")||e.target.closest(".empty-hero"))return;
    ptrs[e.pointerId]={x:e.clientX,y:e.clientY}; try{viewport.setPointerCapture(e.pointerId);}catch(_){}
    var ids=ptrIds();
    if(ids.length===1){ panning=true; panStart={x:e.clientX-tx.x,y:e.clientY-tx.y}; viewport.classList.add("grabbing"); }
    else if(ids.length===2){ panning=false; var a=ptrs[ids[0]],b=ptrs[ids[1]], r=viewport.getBoundingClientRect();
      pinch={d:ptrDist(a,b), k:tx.k, tx:tx.x, ty:tx.y, mx:(a.x+b.x)/2-r.left, my:(a.y+b.y)/2-r.top}; } });
  viewport.addEventListener("pointermove",function(e){ if(!(e.pointerId in ptrs))return; ptrs[e.pointerId]={x:e.clientX,y:e.clientY};
    var ids=ptrIds();
    if(pinch && ids.length>=2){ var a=ptrs[ids[0]],b=ptrs[ids[1]]; var nd=ptrDist(a,b);
      if(pinch.d>0){ var k2=clampK(pinch.k*(nd/pinch.d)), g=k2/pinch.k; tx.k=k2; tx.x=pinch.mx-(pinch.mx-pinch.tx)*g; tx.y=pinch.my-(pinch.my-pinch.ty)*g; applyTransform(); }
      return; }
    if(panning){ tx.x=e.clientX-panStart.x; tx.y=e.clientY-panStart.y; applyTransform(); } });
  function releasePtr(e){ if(e.pointerId in ptrs)delete ptrs[e.pointerId]; var ids=ptrIds();
    if(ids.length<2)pinch=null;
    if(ids.length===1){ var id=ids[0]; panning=true; panStart={x:ptrs[id].x-tx.x,y:ptrs[id].y-tx.y}; }
    if(ids.length===0){ panning=false; viewport.classList.remove("grabbing"); saveUI(); } }
  viewport.addEventListener("pointerup",releasePtr); viewport.addEventListener("pointercancel",releasePtr);
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
    .then(function(r){ if(r.status===200){ passcode=val; try{localStorage.setItem("kz_pass",val);}catch(e){} setEditMode(true); closePasscode(); if(document.getElementById("privateGate")){ location.reload(); } }
      else { $("pcErr").textContent=T("pcWrong"); } })
    .catch(function(){ $("pcErr").textContent=T("offline"); }); }

  /* ================= Events ================= */
  var cardDrag=null, linking=null, tempLine=null, linkMenu=null, moveArmedId=null;
  function setMoveHint(on){ var h=$("moveHint"); if(!h)return;
    if(on&&P(moveArmedId)){ $("moveHintTxt").textContent=T("moveHint").replace("{a}",nameOf(moveArmedId)); $("moveHintDone").textContent=T("doneBtn"); h.classList.add("show"); }
    else{ h.classList.remove("show"); } }
  function armMove(id){ if(!P(id))return; moveArmedId=id; render(); setMoveHint(true); focusPerson(id); }
  function disarmMove(){ if(!moveArmedId)return; moveArmedId=null; setMoveHint(false); render(); }
  function screenToCanvas(cx,cy){ var r=viewport.getBoundingClientRect(); return {x:(cx-r.left-tx.x)/tx.k, y:(cy-r.top-tx.y)/tx.k}; }
  function viewCenterCanvas(){ var r=viewport.getBoundingClientRect(); return {x:(r.width/2-tx.x)/tx.k, y:(r.height/2-tx.y)/tx.k}; }

  stage.addEventListener("pointerdown",function(e){
    if(editMode && e.target && e.target.classList && e.target.classList.contains("w-hit")){ e.preventDefault(); e.stopPropagation(); openLineMenu(e.target, e.clientX, e.clientY); return; }
    var handle = editMode ? (e.target.closest && e.target.closest(".link-handle")) : null;
    if(handle){ e.preventDefault(); e.stopPropagation(); startLink(handle.getAttribute("data-id")); return; }
    var card=e.target.closest(".card"); if(!card) return;
    e.stopPropagation();
    var id=card.getAttribute("data-id"); var p=P(id); if(!p) return;
    var touch=(e.pointerType==="touch"||e.pointerType==="pen");
    // On touch a plain swipe should NOT move a card — it pans. Moving needs a long-press,
    // or the card being armed for moving via the editor's "Move" button. Mouse drags move as before.
    var authorized=(!touch)||(moveArmedId===id);
    cardDrag={id:id, startX:px(p), startY:py(p), sx:e.clientX, sy:e.clientY, lx:e.clientX, ly:e.clientY, moved:false, card:card, touch:touch, authorized:authorized, lp:null, snap:cloneState()};
    try{ card.setPointerCapture(e.pointerId); }catch(_){}
    if(editMode && touch && !authorized){
      cardDrag.lp=setTimeout(function(){ if(!cardDrag||cardDrag.moved)return;
        cardDrag.authorized=true; cardDrag.card.classList.add("lifted");
        var pp=P(cardDrag.id); if(pp){ cardDrag.startX=px(pp); cardDrag.startY=py(pp); }
        cardDrag.sx=cardDrag.lx; cardDrag.sy=cardDrag.ly;
        try{ if(navigator.vibrate)navigator.vibrate(15); }catch(_){}
      }, 320);
    }
  });
  document.addEventListener("pointermove",function(e){
    if(cardDrag){
      var dx=e.clientX-cardDrag.lx, dy=e.clientY-cardDrag.ly; cardDrag.lx=e.clientX; cardDrag.ly=e.clientY;
      if(!cardDrag.moved && Math.abs(e.clientX-cardDrag.sx)+Math.abs(e.clientY-cardDrag.sy)>(cardDrag.touch?9:4)){
        cardDrag.moved=true; if(cardDrag.lp){ clearTimeout(cardDrag.lp); cardDrag.lp=null; } // early movement = a swipe, not a hold
      }
      if(!cardDrag.moved) return;
      if(editMode && cardDrag.authorized){ var p=P(cardDrag.id); if(!p)return;
        p.x=cardDrag.startX+(e.clientX-cardDrag.sx)/tx.k; p.y=cardDrag.startY+(e.clientY-cardDrag.sy)/tx.k;
        cardDrag.card.style.left=p.x+"px"; cardDrag.card.style.top=p.y+"px"; cardDrag.card.classList.add("dragging"); drawWires(); }
      else { tx.x+=dx; tx.y+=dy; applyTransform(); } // not authorized (or view mode) -> pan the canvas
      return;
    }
    if(linking){ updateTempLine(e); }
  });
  document.addEventListener("pointerup",function(e){
    if(cardDrag){ var cd=cardDrag; cardDrag=null; if(cd.lp)clearTimeout(cd.lp);
      cd.card.classList.remove("dragging"); cd.card.classList.remove("lifted");
      if(cd.moved){
        if(editMode && cd.authorized){ pushUndo(cd.snap); var sz=canvasSize(); stage.style.width=sz.w+"px"; stage.style.height=sz.h+"px"; scheduleSave(true);
          if(moveArmedId===cd.id){ moveArmedId=null; setMoveHint(false); render(); toast(T("moveDone")); } }
        else { saveUI(); } // was a canvas pan
      } else { openPerson(cd.id); } // tap
      return; }
    if(linking){ finishLink(e); }
  });
  stage.addEventListener("keydown",function(e){ var card=e.target.closest(".card"); if(card&&(e.key==="Enter"||e.key===" ")){e.preventDefault();openPerson(card.getAttribute("data-id"));} });

  function startLink(id){ if(!P(id))return; linking={from:id}; var a=P(id); var ax=a.x+U/2, ay=a.y+CH;
    tempLine=document.createElementNS("http://www.w3.org/2000/svg","line");
    tempLine.setAttribute("x1",ax); tempLine.setAttribute("y1",ay); tempLine.setAttribute("x2",ax); tempLine.setAttribute("y2",ay);
    tempLine.setAttribute("class","w-temp");
    wires.appendChild(tempLine); document.body.classList.add("linking"); }
  function updateTempLine(e){ if(!tempLine)return; var c=screenToCanvas(e.clientX,e.clientY); tempLine.setAttribute("x2",c.x); tempLine.setAttribute("y2",c.y); }
  function coupleAt(cx,cy,el){
    // 1) precise: dropped straight on a partner connector
    if(el){ var hit=el.closest?el.closest('.w-hit[data-lt="partner"]'):null;
      if(hit){ var a=hit.getAttribute("data-a"), b=hit.getAttribute("data-b"); if(P(a)&&P(b))return {a:a,b:b}; } }
    // 2) forgiving: nearest couple midpoint within radius
    var best=null, bestD=140*140, pdone={};
    persons().forEach(function(p){ (p.partners||[]).forEach(function(pid){ if(!P(pid))return; var key=[p.id,pid].sort().join("_"); if(pdone[key])return; pdone[key]=1;
      var m=midOfCouple(p.id,pid); var dx=m.x-cx, dy=m.y-cy, d=dx*dx+dy*dy; if(d<bestD){ bestD=d; best={a:p.id,b:pid}; } }); });
    return best;
  }
  function midOfCouple(a,b){ var A=ctr(P(a)), B=ctr(P(b)); return {x:(A.x+B.x)/2, y:(A.y+B.y)/2}; }
  function finishLink(e){ var from=linking?linking.from:null; linking=null;
    if(tempLine){ if(tempLine.parentNode)tempLine.parentNode.removeChild(tempLine); tempLine=null; } document.body.classList.remove("linking");
    var el=document.elementFromPoint(e.clientX,e.clientY); var card=el&&el.closest?el.closest(".card"):null;
    if(card){ var to=card.getAttribute("data-id"); if(to&&to!==from&&P(to)&&P(from)){ openLinkChooser(from,to,e.clientX,e.clientY); return; } }
    // dropped on / near the line between a couple -> make `from` a child of both
    if(from&&P(from)){ var c=screenToCanvas(e.clientX,e.clientY); var cp=coupleAt(c.x,c.y,el);
      if(cp && from!==cp.a && from!==cp.b){ pushUndo(); P(from).parents=[cp.a,cp.b]; render(); scheduleSave(true);
        if(typeof toast==="function") toast(T("linkedToCouple").replace("{a}",nameOf(cp.a)).replace("{b}",nameOf(cp.b))); return; } }
    drawWires(); }

  function closeLinkMenu(){ if(linkMenu){ if(linkMenu.parentNode)linkMenu.parentNode.removeChild(linkMenu); linkMenu=null; document.removeEventListener("pointerdown",onDocForLink,true); } }
  function onDocForLink(e){ if(linkMenu && !linkMenu.contains(e.target)) closeLinkMenu(); }
  function nameOf(id){ var nm=nameFor(P(id),lang); return nm.primary||nm.secondary||T("newPerson"); }
  function openLinkChooser(from,to,clientX,clientY){
    closeLinkMenu();
    var an=nameOf(from), bn=nameOf(to);
    var fmt=function(k){ return T(k).replace("{a}",an).replace("{b}",bn); };
    linkMenu=document.createElement("div"); linkMenu.className="link-menu";
    linkMenu.innerHTML='<div class="lm-head">'+esc(T("howRelated"))+'</div>';
    var rows=[
      {t:fmt("relParentOf"), fn:function(){ addParentTo(to,from); }},
      {t:fmt("relChildOf"),  fn:function(){ addParentTo(from,to); }},
      {t:fmt("relPartners"), fn:function(){ setPartners(from,to); }},
      {t:fmt("relRaised"),   fn:function(){ addGuardianTo(to,from); }}
    ];
    rows.forEach(function(o){ var b=document.createElement("button"); b.className="lm-opt"; b.textContent=o.t;
      b.addEventListener("click",function(){ pushUndo(); o.fn(); closeLinkMenu(); render(); scheduleSave(true); }); linkMenu.appendChild(b); });
    var cx2=document.createElement("button"); cx2.className="lm-cancel"; cx2.textContent=T("pcCancel"); cx2.addEventListener("click",closeLinkMenu); linkMenu.appendChild(cx2);
    document.body.appendChild(linkMenu);
    var mw=linkMenu.offsetWidth, mh=linkMenu.offsetHeight, vw=window.innerWidth, vh=window.innerHeight;
    linkMenu.style.left=Math.max(10,Math.min(clientX, vw-mw-10))+"px";
    linkMenu.style.top=Math.max(10,Math.min(clientY, vh-mh-10))+"px";
    setTimeout(function(){ document.addEventListener("pointerdown",onDocForLink,true); },0);
  }
  function addParentTo(childId,parentId){ var c=P(childId); if(!c||childId===parentId)return; c.parents=c.parents||[]; if(c.parents.indexOf(parentId)<0){ if(c.parents.length>=2)c.parents.shift(); c.parents.push(parentId); } }
  function setPartners(a,b){ linkPartners(a,b); }
  function addGuardianTo(childId,gid){ var c=P(childId); if(!c||childId===gid)return; c.guardians=c.guardians||[]; if(c.guardians.indexOf(gid)<0)c.guardians.push(gid); }

  function openLineMenu(el, clientX, clientY){
    closeLinkMenu();
    var lt=el.getAttribute("data-lt"), a=el.getAttribute("data-a"), a2=el.getAttribute("data-a2"), b=el.getAttribute("data-b");
    if(!P(a)||!P(b)) return;
    var fmt=function(k,x){ return T(k).replace("{a}",nameOf(x||a)).replace("{b}",nameOf(b)); };
    linkMenu=document.createElement("div"); linkMenu.className="link-menu";
    linkMenu.innerHTML='<div class="lm-head">'+esc(T("editLink"))+'</div>';
    var rows=[];
    if(lt==="partner"){ rows.push({t:fmt("removePartners"), fn:function(){ unlinkPartners(a,b); }}); }
    else if(lt==="guard"){ rows.push({t:fmt("removeRaised"), fn:function(){ var c=P(b); if(c&&c.guardians)c.guardians=c.guardians.filter(function(x){return x!==a;}); }}); }
    else { rows.push({t:fmt("removeParent"), fn:function(){ var c=P(b); if(c&&c.parents)c.parents=c.parents.filter(function(x){return x!==a;}); }});
      if(a2&&P(a2)){ rows.push({t:fmt("removeParent",a2), fn:function(){ var c=P(b); if(c&&c.parents)c.parents=c.parents.filter(function(x){return x!==a2;}); }}); } }
    rows.forEach(function(o){ var bt=document.createElement("button"); bt.className="lm-opt danger"; bt.textContent=o.t;
      bt.addEventListener("click",function(){ pushUndo(); o.fn(); closeLinkMenu(); render(); scheduleSave(true); }); linkMenu.appendChild(bt); });
    var cx=document.createElement("button"); cx.className="lm-cancel"; cx.textContent=T("pcCancel"); cx.addEventListener("click",closeLinkMenu); linkMenu.appendChild(cx);
    document.body.appendChild(linkMenu);
    var mw=linkMenu.offsetWidth, mh=linkMenu.offsetHeight, vw=window.innerWidth, vh=window.innerHeight;
    linkMenu.style.left=Math.max(10,Math.min(clientX, vw-mw-10))+"px";
    linkMenu.style.top=Math.max(10,Math.min(clientY, vh-mh-10))+"px";
    setTimeout(function(){ document.addEventListener("pointerdown",onDocForLink,true); },0);
  }

  var currentView="tree";
  function setView(v){ currentView=v;
    document.body.classList.toggle("mapview",v==="map");
    document.body.classList.toggle("tapestryview",v==="tapestry");
    $("viewTree").setAttribute("aria-pressed",v==="tree");
    $("viewMap").setAttribute("aria-pressed",v==="map");
    var vt=$("viewTapestry"); if(vt)vt.setAttribute("aria-pressed",v==="tapestry");
    if(v==="map"){ renderMap(true); }
    if(v==="tapestry"){ renderTapestry(true); } }
  function switchView(toMap){ setView(toMap?"map":"tree"); }
  $("viewTree").addEventListener("click",function(){ setView("tree"); });
  $("viewMap").addEventListener("click",function(){ setView("map"); });
  if($("viewTapestry"))$("viewTapestry").addEventListener("click",function(){ setView("tapestry"); });

  function refreshActiveView(){ if(currentView==="map")renderMap(); else if(currentView==="tapestry")renderTapestry(); }
  $("langEl").addEventListener("click",function(){ lang="el"; paintChrome(); render(); refreshActiveView(); saveUI(); });
  $("langEn").addEventListener("click",function(){ lang="en"; paintChrome(); render(); refreshActiveView(); saveUI(); });

  /* ================= Tapestry (Bayeux embroidery) view ================= */
  var TAP={k:1,x:0,y:0,w:1200,h:800,_did:false};
  var TAP_PAL={ linen:"#e7d9b8", linenDk:"#d8c69c", ink:"#3b2c17", brown:"#7a5a2a",
    cream:"#f4ecd6", terra:"#a8432b", terraDk:"#7d3320", ochre:"#c98a2b", gold:"#d8ab48" };
  var TAP_WOOLS=["#a8432b","#356170","#5f7146","#2b3f66","#b46a53","#7a5a2a"];
  var TAP_EMB={
    plane:'<path d="M12 2.2c.7 0 1.1 1.3 1.2 3.3l6.9 3.5c.4.2.6.6.6 1.1l-7.4-1.3-.2 4.9 2.4 1.8c.2.2.3.5.2.8l-3.5-.9-3.5.9c-.1-.3 0-.6.2-.8l2.4-1.8-.2-4.9L4.3 10.1c0-.5.2-.9.6-1.1l6.9-3.5c.1-2 .5-3.3 1.2-3.3z"/>',
    book:'<path d="M12 6C9.3 4.2 6.4 4.1 3.7 5.2v11.6C6.4 15.7 9.3 15.8 12 17.6c2.7-1.8 5.6-1.9 8.3-.8V5.2C17.6 4.1 14.7 4.2 12 6z"/><path fill="none" d="M12 6.1v11.4"/>',
    med:'<path d="M9.6 3.2h4.8v5.8H21v4.8h-6.6V21H9.6v-7.2H3V9h6.6V3.2z"/>',
    shield:'<path d="M12 2.8l7.2 2.3v5.6c0 4.9-3.3 8-7.2 9.7-3.9-1.7-7.2-4.8-7.2-9.7V5.1L12 2.8z"/><path fill="none" d="M12 6.4v8.4M8.6 9.2h6.8"/>',
    anchor:'<circle cx="12" cy="4.4" r="1.8"/><path fill="none" d="M12 6.2v11.6M7.6 9.4h8.8M5.6 12.4c0 3.4 3 5.6 6.4 5.6s6.4-2.2 6.4-5.6"/>',
    fish:'<path d="M3.4 12c3-4.2 9.4-4.2 12.4 0-3 4.2-9.4 4.2-12.4 0z"/><path d="M15.8 12l4.8-2.8v5.6L15.8 12z"/><circle cx="7" cy="10.8" r="1" fill="#3b2c17" stroke="none"/>',
    lyre:'<path fill="none" d="M8.2 20c-2.2-4.4-3-9.4 0-13.4M15.8 20c2.2-4.4 3-9.4 0-13.4M8.6 7c1.6-1.4 6.2-1.4 6.8 0M9.5 9.2v8.2M12 8.8v8.6M14.5 9.2v8.2"/>',
    church:'<path d="M10.4 3h3.2v5.2H19v3.2h-5.4V21h-3.2V11.4H5V8.2h5.4V3z"/>',
    loaf:'<path d="M3.6 15.2c0-3.5 3.8-6.2 8.4-6.2s8.4 2.7 8.4 6.2v1.2H3.6v-1.2z"/><path fill="none" d="M8 12.4l-1 3.2M12 11.6v4M16 12.4l1 3.2"/>',
    gear:'<path d="M12 2.2l1.5 2.4 2.7-.9.5 2.8 2.8.5-.9 2.7L21 12l-2.4 1.5.9 2.7-2.8.5-.5 2.8-2.7-.9L12 21.8l-1.5-2.4-2.7.9-.5-2.8-2.8-.5.9-2.7L3 12l2.4-1.5-.9-2.7 2.8-.5.5-2.8 2.7.9L12 2.2z"/><circle cx="12" cy="12" r="3.4" fill="#f4ecd6"/>',
    wheat:'<path fill="none" d="M12 21c0-4.6-2.6-6.8-2.6-10.6M12 21c0-4.6 2.6-6.8 2.6-10.6M12 21V8"/><path d="M12 3.4c1.4.9 1.4 2.7 0 3.6-1.4-.9-1.4-2.7 0-3.6zM9 6.6c1.4.5 2.1 1.6 2.1 3.1-1.4-.5-2.1-1.6-2.1-3.1zM15 6.6c-1.4.5-2.1 1.6-2.1 3.1 1.4-.5 2.1-1.6 2.1-3.1z"/>',
    palette:'<path d="M12 3.2c4.9 0 7.9 3 7.9 6.4 0 2.1-1.8 2.9-3.4 2.9-1 0-1.8.7-1.8 1.7 0 .6.3 1 .3 1.6 0 1-.9 1.7-2 1.7C8 17.2 4.1 15 4.1 10.6 4.1 6.5 7.6 3.2 12 3.2z"/><circle cx="8" cy="9" r="1" fill="#3b2c17" stroke="none"/><circle cx="11.6" cy="6.9" r="1" fill="#3b2c17" stroke="none"/><circle cx="15.4" cy="8.8" r="1" fill="#3b2c17" stroke="none"/>',
    quill:'<path d="M20 4.2c-7 .9-12.2 6.2-14.2 15 1.6-.5 3-.9 4.2-1.6C13 15.5 17 11 20 4.2z"/><path fill="none" d="M8.4 15.6l3.4-3.4M4.2 19.8h4"/>',
    crown:'<path d="M4 9.2l3.1 3 4.9-6 4.9 6 3.1-3-1.6 8.6H5.6L4 9.2z"/>',
    grapes:'<circle cx="10" cy="8" r="1.9"/><circle cx="13.6" cy="8.4" r="1.9"/><circle cx="8.4" cy="11.4" r="1.9"/><circle cx="12" cy="12" r="1.9"/><circle cx="15.4" cy="11.6" r="1.9"/><circle cx="10.2" cy="15" r="1.9"/><circle cx="13.6" cy="15.2" r="1.9"/><path fill="none" d="M12 4.2c0-1 .8-1.7 2.2-1.7"/>',
    rosette:'<path d="M12 3l2.3 5.2 5.6.5-4.2 3.8 1.2 5.5L12 20.6l-4.9 2.9 1.2-5.5-4.2-3.8 5.6-.5L12 3z"/>'
  };
  var TAP_RULES=[
    [/pilot|aviat|aircraft|aeroplan|airplane|\bplane|\braf\b|spitfire|squadron|airman|air ?force|airline|\bflew\b|flying|flight|aviator/i,"plane"],
    [/teacher|teach|school|professor|lectur|tutor|headmaster|headmistress|educat|scholar|classroom|pupil|schoolmaster/i,"book"],
    [/doctor|nurse|surgeon|\bmedic|hospital|physician|midwife|dentist|pharmac|matron|paramedic/i,"med"],
    [/soldier|\barmy\b|\bwar\b|military|sergeant|colonel|infantry|regiment|veteran|\bmarine|commando|guardsman|artillery|battalion|corporal/i,"shield"],
    [/sailor|\bnavy\b|naval|mariner|merchant navy|seaman|\bship|boatswain|submarine/i,"anchor"],
    [/fisher|fishing|trawler|angler/i,"fish"],
    [/music|singer|composer|pianist|violin|guitar|choir|orchestra|\bsong|cellist|flute/i,"lyre"],
    [/priest|church|monk|vicar|reverend|bishop|deacon|clergy|pastor|\bnun\b|missionary|orthodox/i,"church"],
    [/\bcook|\bchef|baker|bakery|kitchen|restaurant|caterer|caf[eé]|confection|pastry/i,"loaf"],
    [/builder|carpenter|engineer|mason|mechanic|factory|blacksmith|plumber|electrician|joiner|fitter|machinist|labour|foreman/i,"gear"],
    [/farmer|\bfarm|agricultur|shepherd|harvest|orchard|grower|cattle|livestock|peasant/i,"wheat"],
    [/artist|painter|\bpaints?\b|sculptor|designer|drawing|illustrat|iconograph/i,"palette"],
    [/writer|author|\bpoet|journalist|\bclerk|accountant|lawyer|solicitor|barrister|\bjudge|scribe|book-?keeper|secretary|notary/i,"quill"],
    [/\bking\b|\bqueen\b|prince|princess|\bnoble|royal|\blord\b|\blady\b|\bduke\b|\bearl\b|aristocrat/i,"crown"],
    [/vineyard|\bwine|winemaker|grape|\bolive|grocer|merchant|vintner/i,"grapes"]
  ];
  function tapEmblemKey(p){ var s=((p.notes||"")+" "+(p.nick||"")+" "+(p.maiden||"")+" "+(p.source||"")).toLowerCase();
    for(var i=0;i<TAP_RULES.length;i++){ if(TAP_RULES[i][0].test(s))return TAP_RULES[i][1]; } return "rosette"; }
  function tapHash(id){ var h=0; id=""+id; for(var i=0;i<id.length;i++){ h=(h*31+id.charCodeAt(i))>>>0; } return h; }
  function tapName(p){ var nm=nameFor(p,lang); return (nm.primary||nm.secondary||"—"); }
  function tapUpper(s){ try{ return (s||"").toUpperCase().normalize("NFD").replace(/[̀-ͯ΄΅]/g,"").normalize("NFC"); }catch(e){ return (s||"").toUpperCase(); } }
  function tapYear(p){ return yearsFor(p).txt; }
  function tapClip(s,n){ s=s||""; return s.length>n?s.slice(0,n-1)+"…":s; }
  function tapWrap(s,max,maxLines){ s=(s||"").replace(/\s+/g," ").trim(); if(!s)return [];
    var words=s.split(" "), lines=[], cur="";
    for(var i=0;i<words.length;i++){ var w=words[i]; var t=cur?cur+" "+w:w;
      if(t.length>max && cur){ lines.push(cur); cur=w; if(lines.length===maxLines){ break; } } else cur=t; }
    if(lines.length<maxLines && cur) lines.push(cur);
    if(lines.length>maxLines) lines=lines.slice(0,maxLines);
    if((lines.join(" ").length) < s.length){ lines[lines.length-1]=tapClip(lines[lines.length-1]+"…",max+2).replace("……","…"); }
    return lines; }
  function tapBanner(bx,by,bw,bh){ var n=12;
    return "M"+bx+" "+by+" L"+(bx+bw)+" "+by+" L"+(bx+bw-n)+" "+(by+bh/2)+" L"+(bx+bw)+" "+(by+bh)+
           " L"+bx+" "+(by+bh)+" L"+(bx+n)+" "+(by+bh/2)+" Z"; }
  function tapEmblemG(p,ex,ey,wool){ var s=(22/24).toFixed(4);
    return '<g transform="translate('+(ex-11).toFixed(1)+','+(ey-11).toFixed(1)+') scale('+s+')" fill="'+wool+
      '" stroke="'+TAP_PAL.ink+'" stroke-width="1.15" stroke-linejoin="round" stroke-linecap="round">'+
      (TAP_EMB[tapEmblemKey(p)]||TAP_EMB.rosette)+'</g>'; }

  function buildTapestrySVG(){
    var ps=persons();
    var R=48, NODE_W=210, COL=290, ROW=252, MARGIN=74, BORDER=72;
    var FONT='Georgia, \'Times New Roman\', serif';
    if(!ps.length){
      var W0=760,H0=430;
      var e=[]; e.push('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="'+W0+'" height="'+H0+'" viewBox="0 0 '+W0+' '+H0+'">');
      e.push(tapDefs());
      e.push('<rect width="'+W0+'" height="'+H0+'" fill="url(#tapWeave)"/>');
      e.push(tapBorders(W0,H0,BORDER));
      e.push('<g transform="translate('+(W0/2)+','+(H0/2)+')" fill="'+TAP_PAL.brown+'" stroke="'+TAP_PAL.ink+'" stroke-width="1.2" stroke-linejoin="round"><g transform="translate(-12,-52) scale(1)">'+TAP_EMB.rosette+'</g></g>');
      e.push('<text x="'+(W0/2)+'" y="'+(H0/2+10)+'" text-anchor="middle" font-family="'+FONT+'" font-size="19" fill="'+TAP_PAL.ink+'">'+esc(T("tapEmpty"))+'</text>');
      e.push('</svg>');
      return {svg:e.join(""),w:W0,h:H0};
    }
    var inSet={}; ps.forEach(function(p){inSet[p.id]=true;});
    // Generation = longest ancestor chain, then relax so a person sits at least one below every
    // in-set parent and level with any in-set partner (married-in spouses join their partner's row).
    var memo={}; ps.forEach(function(p){ memo[p.id]=0; });
    (function(){ var guard=ps.length+4;
      for(var it=0; it<guard; it++){ var changed=false;
        ps.forEach(function(p){ var g=memo[p.id];
          (p.parents||[]).forEach(function(par){ if(inSet[par]&&par!==p.id&&memo[par]+1>g)g=memo[par]+1; });
          (p.partners||[]).forEach(function(pt){ if(inSet[pt]&&pt!==p.id&&memo[pt]>g)g=memo[pt]; });
          if(g!==memo[p.id]){ memo[p.id]=g; changed=true; } });
        if(!changed)break; }
    })();
    function byr(id){ var b=(P(id).birth||"").match(/\d{4}/); return b?+b[0]:9999; }
    var byGen={}, maxG=0; ps.forEach(function(p){ var g=memo[p.id]||0; (byGen[g]=byGen[g]||[]).push(p.id); if(g>maxG)maxG=g; });
    var gks=Object.keys(byGen).map(Number).sort(function(a,b){return a-b;});
    var orderIdx={}, colRows={};
    gks.forEach(function(g){
      function parentKey(id){ var par=(P(id).parents||[]).filter(function(x){return orderIdx[x]!=null;});
        if(!par.length)return 100000+byr(id); var s=0; par.forEach(function(x){s+=orderIdx[x];}); return (s/par.length)*10; }
      var list=byGen[g].slice();
      list.sort(function(a,b){ var ka=parentKey(a),kb=parentKey(b); if(ka!==kb)return ka-kb;
        var ya=byr(a),yb=byr(b); if(ya!==yb)return ya-yb; return tapName(P(a)).localeCompare(tapName(P(b))); });
      var placed={}, seq=[];
      list.forEach(function(id){ if(placed[id])return; placed[id]=1; seq.push(id);
        (P(id).partners||[]).forEach(function(pt){ if(!placed[pt]&&inSet[pt]&&(memo[pt]||0)===g){ placed[pt]=1; seq.push(pt); } }); });
      colRows[g]=seq; seq.forEach(function(id,i){ orderIdx[id]=i; });
    });
    var maxRows=1; gks.forEach(function(g){ if(colRows[g].length>maxRows)maxRows=colRows[g].length; });
    var pos={};
    gks.forEach(function(g){ var ids=colRows[g], n=ids.length, yStart=BORDER+70+(maxRows-n)*ROW/2;
      ids.forEach(function(id,i){ pos[id]={ x:MARGIN+R+g*COL, y:yStart+i*ROW, g:g, wool:TAP_WOOLS[tapHash(id)%TAP_WOOLS.length] }; }); });
    var maxCx=MARGIN+R+maxG*COL;
    var W=Math.round(maxCx+NODE_W/2+MARGIN);
    var H=Math.round(BORDER*2+70*2+(maxRows-1)*ROW+140);

    var defs=[tapDefs()], clips=[], wires=[], nodes=[];
    // connectors (parent -> child)
    ps.forEach(function(p){ var cp=pos[p.id]; if(!cp)return;
      (p.parents||[]).forEach(function(par){ var pa=pos[par]; if(!pa)return;
        var x1,x2; if(pa.x<=cp.x){ x1=pa.x+R+8; x2=cp.x-R-8; } else { x1=pa.x-R-8; x2=cp.x+R+8; }
        var y1=pa.y, y2=cp.y, mx=(x1+x2)/2;
        var d="M"+x1.toFixed(1)+" "+y1.toFixed(1)+" C"+mx.toFixed(1)+" "+y1.toFixed(1)+","+mx.toFixed(1)+" "+y2.toFixed(1)+","+x2.toFixed(1)+" "+y2.toFixed(1);
        wires.push('<path d="'+d+'" fill="none" stroke="'+cp.wool+'" stroke-width="3.4" stroke-linecap="round" opacity="0.92"/>');
        wires.push('<path d="'+d+'" fill="none" stroke="'+TAP_PAL.ink+'" stroke-width="1.1" stroke-dasharray="1.5 6.5" stroke-linecap="round" opacity="0.75"/>');
      }); });
    // partner links
    var seenPair={};
    ps.forEach(function(p){ (p.partners||[]).forEach(function(pt){ if(!inSet[pt])return;
      var key=[p.id,pt].sort().join("|"); if(seenPair[key])return; seenPair[key]=1;
      var a=pos[p.id], b=pos[pt]; if(!a||!b)return;
      var ax,ay,bx,by;
      if(Math.abs(a.x-b.x)<Math.abs(a.y-b.y)){ // stacked vertically
        if(a.y<b.y){ ax=a.x;ay=a.y+R+8; bx=b.x;by=b.y-R-8; } else { ax=a.x;ay=a.y-R-8; bx=b.x;by=b.y+R+8; }
      } else { // side by side
        if(a.x<b.x){ ax=a.x+R+8;ay=a.y; bx=b.x-R-8;by=b.y; } else { ax=a.x-R-8;ay=a.y; bx=b.x+R+8;by=b.y; }
      }
      var mx=(ax+bx)/2, my=(ay+by)/2;
      wires.push('<path d="M'+ax.toFixed(1)+' '+ay.toFixed(1)+' L'+bx.toFixed(1)+' '+by.toFixed(1)+'" stroke="'+TAP_PAL.gold+'" stroke-width="3" stroke-dasharray="6 5" stroke-linecap="round" fill="none"/>');
      wires.push('<path d="M'+mx.toFixed(1)+' '+(my-6).toFixed(1)+' L'+(mx+6).toFixed(1)+' '+my.toFixed(1)+' L'+mx.toFixed(1)+' '+(my+6).toFixed(1)+' L'+(mx-6).toFixed(1)+' '+my.toFixed(1)+' Z" fill="'+TAP_PAL.terra+'" stroke="'+TAP_PAL.ink+'" stroke-width="1"/>');
    }); });
    // nodes
    ps.forEach(function(p){ var cp=pos[p.id]; if(!cp)return; var cx=cp.x, cy=cp.y, wool=cp.wool;
      var cid="tclip_"+tapHash(p.id).toString(36);
      clips.push('<clipPath id="'+cid+'"><circle cx="'+cx+'" cy="'+cy+'" r="'+R+'"/></clipPath>');
      var g=['<g>'];
      g.push('<circle cx="'+cx+'" cy="'+cy+'" r="'+(R+8)+'" fill="'+TAP_PAL.cream+'" stroke="'+TAP_PAL.ink+'" stroke-width="2"/>');
      if(p.photo){
        g.push('<image href="'+p.photo+'" xlink:href="'+p.photo+'" x="'+(cx-R)+'" y="'+(cy-R)+'" width="'+(2*R)+'" height="'+(2*R)+'" preserveAspectRatio="xMidYMid slice" clip-path="url(#'+cid+')" filter="url(#tapWool)"/>');
      } else {
        g.push('<circle cx="'+cx+'" cy="'+cy+'" r="'+R+'" fill="'+wool+'"/>');
        g.push('<g clip-path="url(#'+cid+')" fill="'+TAP_PAL.cream+'" opacity="0.9"><circle cx="'+cx+'" cy="'+(cy-R*0.16).toFixed(1)+'" r="'+(R*0.3).toFixed(1)+'"/><path d="M'+(cx-R*0.62).toFixed(1)+' '+(cy+R).toFixed(1)+' a '+(R*0.62).toFixed(1)+' '+(R*0.6).toFixed(1)+' 0 0 1 '+(R*1.24).toFixed(1)+' 0 Z"/></g>');
        g.push('<text x="'+cx+'" y="'+(cy+R*0.05).toFixed(1)+'" text-anchor="middle" dominant-baseline="central" font-family="'+FONT+'" font-size="30" fill="'+wool+'">'+esc(initialOf(p))+'</text>');
      }
      g.push('<circle cx="'+cx+'" cy="'+cy+'" r="'+(R+3)+'" fill="none" stroke="'+wool+'" stroke-width="2.6" stroke-dasharray="3 4"/>');
      var ex=cx+R*0.72, ey=cy+R*0.72;
      g.push('<circle cx="'+ex.toFixed(1)+'" cy="'+ey.toFixed(1)+'" r="16" fill="'+TAP_PAL.cream+'" stroke="'+TAP_PAL.ink+'" stroke-width="1.6"/>');
      g.push(tapEmblemG(p,ex,ey,wool));
      var by=cy+R+18, bw=NODE_W, bh=32, bx=cx-bw/2;
      g.push('<path d="'+tapBanner(bx,by,bw,bh)+'" fill="'+TAP_PAL.cream+'" stroke="'+TAP_PAL.ink+'" stroke-width="1.6"/>');
      var nm=tapUpper(tapName(p)); var fs=nm.length>17?12.5:(nm.length>13?14.5:16.5);
      g.push('<text x="'+cx+'" y="'+(by+bh/2+1)+'" text-anchor="middle" dominant-baseline="central" font-family="'+FONT+'" font-size="'+fs+'" letter-spacing="1.1" fill="'+TAP_PAL.ink+'">'+esc(tapClip(nm,24))+'</text>');
      var ty=by+bh+15; var yr=tapYear(p);
      if(yr){ g.push('<text x="'+cx+'" y="'+ty+'" text-anchor="middle" font-family="'+FONT+'" font-size="12" font-style="italic" fill="'+TAP_PAL.brown+'">'+esc(yr)+'</text>'); ty+=17; } else { ty=by+bh+9; }
      tapWrap(p.notes,32,2).forEach(function(ln,i){
        g.push('<text x="'+cx+'" y="'+(ty+2+i*15)+'" text-anchor="middle" font-family="'+FONT+'" font-size="12.5" font-style="italic" fill="'+TAP_PAL.ink+'">'+esc(ln)+'</text>'); });
      g.push('</g>');
      nodes.push(g.join(""));
    });

    var out=[];
    out.push('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'">');
    out.push(defs.join(""));
    out.push('<defs>'+clips.join("")+'</defs>');
    out.push('<rect width="'+W+'" height="'+H+'" fill="url(#tapWeave)"/>');
    out.push('<g>'+wires.join("")+'</g>');
    out.push('<g>'+nodes.join("")+'</g>');
    out.push(tapBorders(W,H,BORDER));
    out.push('</svg>');
    return {svg:out.join(""),w:W,h:H};
  }

  function tapDefs(){
    return '<defs>'+
      '<pattern id="tapWeave" width="5" height="5" patternUnits="userSpaceOnUse">'+
        '<rect width="5" height="5" fill="'+TAP_PAL.linen+'"/>'+
        '<path d="M0 0V5" stroke="'+TAP_PAL.linenDk+'" stroke-width="1" opacity="0.45"/>'+
        '<path d="M0 0H5" stroke="#ffffff" stroke-width="1" opacity="0.16"/>'+
      '</pattern>'+
      '<filter id="tapWool" x="-8%" y="-8%" width="116%" height="116%">'+
        '<feColorMatrix type="saturate" values="0.62" result="s"/>'+
        '<feComponentTransfer in="s" result="q">'+
          '<feFuncR type="discrete" tableValues="0.14 0.36 0.56 0.76 0.93"/>'+
          '<feFuncG type="discrete" tableValues="0.12 0.33 0.53 0.73 0.9"/>'+
          '<feFuncB type="discrete" tableValues="0.1 0.3 0.5 0.7 0.88"/>'+
        '</feComponentTransfer>'+
        '<feColorMatrix in="q" type="matrix" values="0.92 0.08 0 0 0.05  0.06 0.86 0.05 0 0.04  0.03 0.09 0.72 0 0.02  0 0 0 1 0" result="w"/>'+
        '<feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="1" seed="4" result="n"/>'+
        '<feDisplacementMap in="w" in2="n" scale="2" xChannelSelector="R" yChannelSelector="G"/>'+
      '</filter>'+
    '</defs>';
  }

  function tapBorders(W,H,BORDER){
    var s=[], FONT='Georgia, \'Times New Roman\', serif';
    function band(y){
      var b=[]; b.push('<rect x="0" y="'+y+'" width="'+W+'" height="'+BORDER+'" fill="'+TAP_PAL.linenDk+'"/>');
      b.push('<path d="M0 '+(y+3)+' H'+W+'" stroke="'+TAP_PAL.ink+'" stroke-width="1.4" stroke-dasharray="7 5" opacity="0.7"/>');
      b.push('<path d="M0 '+(y+BORDER-3)+' H'+W+'" stroke="'+TAP_PAL.ink+'" stroke-width="1.4" stroke-dasharray="7 5" opacity="0.7"/>');
      b.push('<path d="M0 '+(y+BORDER/2)+' H'+W+'" stroke="'+TAP_PAL.terraDk+'" stroke-width="1.6" stroke-dasharray="9 6" opacity="0.55"/>');
      var i=0; for(var x=70;x<W-30;x+=128){ var wool=TAP_WOOLS[i%TAP_WOOLS.length], cy=y+BORDER/2;
        if(i%2===0){ b.push('<g transform="translate('+(x-11)+','+(cy-11)+')" fill="'+wool+'" stroke="'+TAP_PAL.ink+'" stroke-width="1.1" stroke-linejoin="round">'+TAP_EMB.rosette+'</g>'); }
        else { b.push('<path d="M'+x+' '+(cy-9)+' L'+(x+7)+' '+cy+' L'+x+' '+(cy+9)+' L'+(x-7)+' '+cy+' Z" fill="'+wool+'" stroke="'+TAP_PAL.ink+'" stroke-width="1.1"/>'); }
        i++; }
      return b.join("");
    }
    s.push(band(0)); s.push(band(H-BORDER));
    // title cartouche on top band
    var fam=tapUpper((lang==="el"?state.title.el:state.title.en)||"Family");
    var sub=tapUpper(T("sub"));
    var cw=Math.max(220,fam.length*15+70), ch=52, cxx=W/2, cyy=BORDER/2;
    s.push('<rect x="'+(cxx-cw/2)+'" y="'+(cyy-ch/2)+'" width="'+cw+'" height="'+ch+'" rx="6" fill="'+TAP_PAL.cream+'" stroke="'+TAP_PAL.ink+'" stroke-width="2"/>');
    s.push('<rect x="'+(cxx-cw/2+5)+'" y="'+(cyy-ch/2+5)+'" width="'+(cw-10)+'" height="'+(ch-10)+'" rx="4" fill="none" stroke="'+TAP_PAL.gold+'" stroke-width="1.4"/>');
    s.push('<text x="'+cxx+'" y="'+(cyy-4)+'" text-anchor="middle" dominant-baseline="central" font-family="'+FONT+'" font-size="22" letter-spacing="2" fill="'+TAP_PAL.terraDk+'">'+esc(tapClip(fam,26))+'</text>');
    s.push('<text x="'+cxx+'" y="'+(cyy+14)+'" text-anchor="middle" dominant-baseline="central" font-family="'+FONT+'" font-size="10.5" letter-spacing="3" fill="'+TAP_PAL.brown+'">'+esc(tapClip(sub,34))+'</text>');
    return s.join("");
  }

  function renderTapestry(doFit){ var el=$("tapCanvas"); if(!el)return;
    var r=buildTapestrySVG(); TAP.w=r.w; TAP.h=r.h; el.innerHTML=r.svg;
    if(doFit||!TAP._did){ tapFit(); TAP._did=true; } else applyTapTransform(); }
  function applyTapTransform(){ var el=$("tapCanvas"); if(el)el.style.transform="translate("+TAP.x.toFixed(1)+"px,"+TAP.y.toFixed(1)+"px) scale("+TAP.k.toFixed(4)+")"; }
  function tapRect(){ var t=$("tapestry"); return t?t.getBoundingClientRect():{width:1000,height:700}; }
  function tapFit(){ var r=tapRect(), pad=48; var k=Math.min((r.width-pad)/TAP.w,(r.height-pad)/TAP.h); if(!isFinite(k)||k<=0)k=1; k=Math.min(k,1.15);
    TAP.k=k; TAP.x=(r.width-TAP.w*k)/2; TAP.y=(r.height-TAP.h*k)/2; applyTapTransform(); }
  function tapZoom(f,cx,cy){ var r=tapRect(); if(cx==null){cx=r.width/2;cy=r.height/2;}
    var nk=Math.max(0.12,Math.min(4,TAP.k*f)); var wx=(cx-TAP.x)/TAP.k, wy=(cy-TAP.y)/TAP.k;
    TAP.k=nk; TAP.x=cx-wx*nk; TAP.y=cy-wy*nk; applyTapTransform(); }

  (function(){ var tp=$("tapestry"); if(!tp)return;
    if($("tapZIn"))$("tapZIn").addEventListener("click",function(){ tapZoom(1.2); });
    if($("tapZOut"))$("tapZOut").addEventListener("click",function(){ tapZoom(1/1.2); });
    if($("tapFit"))$("tapFit").addEventListener("click",function(){ tapFit(); });
    tp.addEventListener("wheel",function(e){ e.preventDefault(); var r=tapRect(); tapZoom(e.deltaY<0?1.1:1/1.1, e.clientX-r.left, e.clientY-r.top); },{passive:false});
    var drag=null;
    tp.addEventListener("pointerdown",function(e){ if(e.target.closest(".tapbar"))return;
      drag={sx:e.clientX,sy:e.clientY,ox:TAP.x,oy:TAP.y}; tp.classList.add("grabbing"); try{tp.setPointerCapture(e.pointerId);}catch(_){}
    });
    tp.addEventListener("pointermove",function(e){ if(!drag)return; TAP.x=drag.ox+(e.clientX-drag.sx); TAP.y=drag.oy+(e.clientY-drag.sy); applyTapTransform(); });
    function endDrag(){ drag=null; tp.classList.remove("grabbing"); }
    tp.addEventListener("pointerup",endDrag); tp.addEventListener("pointercancel",endDrag); tp.addEventListener("pointerleave",endDrag);
    // export menu
    function closeTapMenu(){ var m=$("tapExportMenu"); if(m)m.classList.remove("open"); }
    if($("tapExportBtn"))$("tapExportBtn").addEventListener("click",function(e){ e.stopPropagation(); var m=$("tapExportMenu"); if(m)m.classList.toggle("open"); });
    document.addEventListener("click",function(e){ if(!e.target.closest("#tapExportBtn")&&!e.target.closest("#tapExportMenu"))closeTapMenu(); });
    if($("tapDlSvg"))$("tapDlSvg").addEventListener("click",function(){ closeTapMenu(); tapDownloadSVG(); });
    if($("tapDlPng"))$("tapDlPng").addEventListener("click",function(){ closeTapMenu(); tapDownloadPNG(); });
    if($("tapDoPrint"))$("tapDoPrint").addEventListener("click",function(){ closeTapMenu(); window.print(); });
  })();

  function tapFileBase(){ return ((state.title&&state.title.en)||"family").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")+"-tapestry"; }
  function tapDownloadBlob(name,blob){ var url=URL.createObjectURL(blob); var a=document.createElement("a");
    a.href=url; a.download=name; document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function(){ URL.revokeObjectURL(url); },4000); }
  function tapDownloadSVG(){ var r=buildTapestrySVG();
    tapDownloadBlob(tapFileBase()+".svg", new Blob([r.svg],{type:"image/svg+xml;charset=utf-8"})); toast(T("tapSvg")); }
  function tapDownloadPNG(){ var r=buildTapestrySVG();
    var scale=Math.min(2.5, Math.max(1, 4200/Math.max(r.w,r.h)));
    var blob=new Blob([r.svg],{type:"image/svg+xml;charset=utf-8"}); var url=URL.createObjectURL(blob);
    var img=new Image();
    img.onload=function(){ try{
      var c=document.createElement("canvas"); c.width=Math.round(r.w*scale); c.height=Math.round(r.h*scale);
      var ctx=c.getContext("2d"); ctx.fillStyle="#e7d9b8"; ctx.fillRect(0,0,c.width,c.height);
      ctx.drawImage(img,0,0,c.width,c.height); URL.revokeObjectURL(url);
      c.toBlob(function(b){ if(b){ tapDownloadBlob(tapFileBase()+".png",b); toast(T("tapPng")); } else { toast("PNG export failed — try SVG"); } },"image/png");
    }catch(err){ URL.revokeObjectURL(url); toast("PNG export failed — try SVG"); } };
    img.onerror=function(){ URL.revokeObjectURL(url); toast("PNG export failed — try SVG"); };
    img.src=url; }

  $("addBtn").addEventListener("click",function(){ if(!editMode){ openPasscode(); return; } addPersonCentered(); });
  $("ehAdd").addEventListener("click",function(){ if(!editMode){ openPasscode(); return; } addFirst(); });
  $("undoBtn").addEventListener("click",function(){ if(editMode)doUndo(); });
  $("redoBtn").addEventListener("click",function(){ if(editMode)doRedo(); });
  document.addEventListener("keydown",function(e){ if(!editMode)return;
    var t=e.target, tag=t&&t.tagName; if(tag==="INPUT"||tag==="TEXTAREA"||tag==="SELECT"||(t&&t.isContentEditable))return;
    var mod=e.ctrlKey||e.metaKey; if(!mod)return; var k=(e.key||"").toLowerCase();
    if(k==="z"&&!e.shiftKey){ e.preventDefault(); doUndo(); }
    else if((k==="z"&&e.shiftKey)||k==="y"){ e.preventDefault(); doRedo(); } });
  $("editBtn").addEventListener("click",function(){ if(editMode){ setEditMode(false); } else { openPasscode(); } });
  $("zIn").addEventListener("click",function(){ zoomAt(1.18); });
  $("zOut").addEventListener("click",function(){ zoomAt(0.85); });
  $("zFit").addEventListener("click",fit);
  $("saveBtn").addEventListener("click",saveAndClose);
  $("moveBtn").addEventListener("click",function(){ if(!editingId)return; var id=editingId; try{commitFields();}catch(_){}
    closeDrawer(); armMove(id); });
  $("moveHintDone").addEventListener("click",disarmMove);
  $("drawerClose").addEventListener("click",function(){ if(editingId)saveAndClose(); else closeDrawer(); });
  $("scrim").addEventListener("click",function(){ if(editingId)saveAndClose(); else closeDrawer(); });
  $("delBtn").addEventListener("click",function(){ if(!editingId)return; if(window.confirm(T("del")+"?"))removePerson(editingId); });
  $("mapPerson").addEventListener("change",function(){ if(mapAddMode)setMapAdd(false); renderMap(true); });
  $("mapAddPin").addEventListener("click",function(){ if(!editMode)return; setMapAdd(!mapAddMode); });
  $("pcOk").addEventListener("click",submitPasscode);
  $("pcCancel").addEventListener("click",closePasscode);
  $("pcInput").addEventListener("keydown",function(e){ if(e.key==="Enter")submitPasscode(); });
  $("pcModal").addEventListener("click",function(e){ if(e.target.id==="pcModal")closePasscode(); });
  document.addEventListener("keydown",function(e){ if(e.key==="Escape"){
    if($("lightbox")&&$("lightbox").classList.contains("open"))closeLightbox();
    else if($("settingsModal")&&$("settingsModal").classList.contains("open"))closeSettings();
    else if($("shareModal")&&$("shareModal").classList.contains("open"))closeShare();
    else if($("helpModal").classList.contains("open"))closeHelp();
    else if($("pcModal").classList.contains("open"))closePasscode();
    else if(drawer.classList.contains("open")){ if(editingId)saveAndClose(); else closeDrawer(); } } });
  drawerBody.addEventListener("click",function(e){ var img=e.target.closest(".m-img");
    if(img){ openLightbox(img.getAttribute("data-full")||img.src); return; }
    var pf=e.target.closest("#prof_photo"); if(pf&&pf.style.backgroundImage){ var mm=pf.style.backgroundImage.match(/url\(["']?(.*?)["']?\)/); if(mm&&mm[1])openLightbox(mm[1]); } });
  (function(){ var lb=$("lightbox"); if(lb) lb.addEventListener("click",closeLightbox); })();

  function openHelp(){ $("helpTitle").textContent=T("helpTitle"); $("helpLede").textContent=T("helpLede");
    var ol=$("helpSteps"); ol.innerHTML=""; T("steps").forEach(function(s){var li=document.createElement("li");li.innerHTML=s;ol.appendChild(li);});
    $("helpNote").innerHTML=T("note"); $("helpModal").classList.add("open"); }
  function closeHelp(){ $("helpModal").classList.remove("open"); }
  $("helpBtn").addEventListener("click",openHelp);
  $("helpClose").addEventListener("click",closeHelp);
  $("helpModal").addEventListener("click",function(e){ if(e.target.id==="helpModal")closeHelp(); });

  function toast(msg){ var t=$("toast"); t.textContent=msg; t.classList.add("show"); setTimeout(function(){t.classList.remove("show");},2600); }

  /* ================= Search / jump to a person ================= */
  function closePops(){ var s=$("searchPop"), d=$("dataMenu"); if(s)s.classList.remove("open"); if(d)d.classList.remove("open"); }
  function focusPerson(id){ var p=P(id); if(!p)return;
    if(document.body.classList.contains("mapview")) switchView(false);
    var r=viewport.getBoundingClientRect();
    var cx=px(p)+U/2, cy=py(p)+CH/2;
    if(tx.k<0.7) tx.k=clampK(0.9);
    tx.x=r.width/2-cx*tx.k; tx.y=r.height/2-cy*tx.k; applyTransform(); saveUI();
    var el=stage.querySelector('.card[data-id="'+id+'"]');
    if(el){ el.classList.remove("flash"); void el.offsetWidth; el.classList.add("flash"); }
  }
  function runSearch(q){ var box=$("searchRes"); box.innerHTML=""; q=(q||"").trim().toLowerCase();
    var ps=persons();
    var hits=ps.filter(function(p){
      var s=[p.nameEn,p.nameEl,p.nick,p.maiden,p.place].filter(Boolean).join(" ").toLowerCase();
      return q?s.indexOf(q)>=0:true;
    }).sort(function(a,b){ return nameOf(a.id).localeCompare(nameOf(b.id)); }).slice(0,40);
    if(!hits.length){ var e=document.createElement("div"); e.className="empty"; e.textContent=T("noResults"); box.appendChild(e); return; }
    hits.forEach(function(p){ var nm=nameFor(p,lang); var b=document.createElement("button"); b.type="button"; b.className="res-item";
      var main=nm.primary||nm.secondary||T("newPerson");
      var sub=(nm.primary&&nm.secondary)?nm.secondary:"";
      var meta=[p.birth,p.death].filter(Boolean).join(" – ");
      b.innerHTML='<span class="res-nm">'+esc(main)+'</span>'+(sub?'<span class="sub">'+esc(sub)+'</span>':'')+(meta?'<span class="sub">'+esc(meta)+'</span>':'');
      b.addEventListener("click",function(){ closePops(); focusPerson(p.id); });
      box.appendChild(b);
    });
  }
  function openSearch(){ closePops(); $("searchPop").classList.add("open"); var inp=$("searchInput"); inp.value=""; runSearch(""); setTimeout(function(){inp.focus();},30); }
  $("searchBtn").addEventListener("click",function(e){ e.stopPropagation(); var open=$("searchPop").classList.contains("open"); if(open)closePops(); else openSearch(); });
  $("searchInput").addEventListener("input",function(){ runSearch(this.value); });
  $("searchInput").addEventListener("keydown",function(e){ if(e.key==="Escape"){closePops();} else if(e.key==="Enter"){ var first=$("searchRes").querySelector(".res-item"); if(first)first.click(); } });
  $("searchPop").addEventListener("click",function(e){ e.stopPropagation(); });

  /* ================= Backup / export ================= */
  function download(name,text,mime){ var blob=new Blob([text],{type:mime||"text/plain;charset=utf-8"}); var url=URL.createObjectURL(blob);
    var a=document.createElement("a"); a.href=url; a.download=name; document.body.appendChild(a); a.click();
    setTimeout(function(){ document.body.removeChild(a); URL.revokeObjectURL(url); },400); }
  function stamp(){ var d=new Date(); function z(n){return (n<10?"0":"")+n;} return d.getFullYear()+z(d.getMonth()+1)+z(d.getDate()); }
  function backupJSON(){ var data={title:state.title,version:state.version,people:state.people,exported:new Date().toISOString(),format:"kazantzis-tree-backup-1"};
    download("kazantzis-tree-"+stamp()+".json", JSON.stringify(data,null,2), "application/json"); }
  function doExportGEDCOM(){ download("kazantzis-tree-"+stamp()+".ged", buildGEDCOM(), "text/plain;charset=utf-8"); }
  function doRestoreClick(){ $("restoreFile").click(); }
  $("restoreFile").addEventListener("change",function(){ var f=this.files&&this.files[0]; if(!f)return; var self=this;
    var rd=new FileReader();
    rd.onload=function(){ try{ var obj=JSON.parse(rd.result);
        var ppl=obj&&obj.people; if(!ppl||typeof ppl!=="object"||!Object.keys(ppl).length) throw new Error("bad");
        if(!confirm(T("restoreConfirm"))){ self.value=""; return; }
        pushUndo();
        state.title=obj.title||state.title; state.people=ppl; normalizePeople();
        ensurePositions(); paintChrome(); render(); scheduleSave(true); fit(); toast(T("restored"));
      }catch(err){ toast(T("restoreBad")); }
      self.value="";
    };
    rd.readAsText(f);
  });
  $("dataBtn").addEventListener("click",function(e){ e.stopPropagation(); var open=$("dataMenu").classList.contains("open"); closePops(); if(!open)$("dataMenu").classList.add("open"); });
  $("dataMenu").addEventListener("click",function(e){ e.stopPropagation(); });
  $("dlBackup").addEventListener("click",function(){ closePops(); backupJSON(); });
  $("dlGedcom").addEventListener("click",function(){ closePops(); doExportGEDCOM(); });
  $("doRestore").addEventListener("click",function(){ closePops(); doRestoreClick(); });

  /* ================= Settings: language & display ================= */
  function openSettings(){
    $("setTitle").textContent=T("setTitle"); $("setLede").textContent=T("setLede");
    $("setBiLbl").textContent=T("setBi"); $("setBiSub").textContent=T("setBiSub");
    $("setMonoLbl").textContent=T("setMono"); $("setMonoSub").textContent=T("setMonoSub");
    $("setSecondLbl").textContent=T("setSecond"); $("setCancel").textContent=T("pcCancel"); $("setSave").textContent=T("save");
    var sel=$("setSecond"); sel.innerHTML=Object.keys(LANGS).map(function(code){ var L=LANGS[code];
      return '<option value="'+code+'"'+(cfg().secondLang===code?" selected":"")+'>'+esc(L.en+" · "+L.native)+'</option>'; }).join("");
    var mono=isMono(); $("setBi").checked=!mono; $("setMono").checked=mono;
    $("setSecondWrap").style.display=mono?"none":"";
    $("settingsModal").classList.add("open");
  }
  function closeSettings(){ $("settingsModal").classList.remove("open"); }
  function settingsModeChange(){ $("setSecondWrap").style.display=$("setMono").checked?"none":""; }
  function saveSettings(){
    pushUndo();
    cfg().mono=$("setMono").checked;
    cfg().secondLang=$("setSecond").value||"el";
    if(isMono())lang="en";
    closeSettings(); paintChrome(); render(); if(document.body.classList.contains("mapview"))renderMap();
    scheduleSave(true); toast(T("setSaved"));
  }
  $("openSettings").addEventListener("click",function(){ closePops(); openSettings(); });
  $("settingsClose").addEventListener("click",closeSettings);
  $("setCancel").addEventListener("click",closeSettings);
  $("setSave").addEventListener("click",saveSettings);
  $("setBi").addEventListener("change",settingsModeChange);
  $("setMono").addEventListener("change",settingsModeChange);
  $("settingsModal").addEventListener("click",function(e){ if(e.target.id==="settingsModal")closeSettings(); });

  /* ================= Share: magic links (view / edit) ================= */
  function shareOrigin(){ return location.origin + location.pathname; }
  function buildLink(token){ return shareOrigin() + (accountMode?("?id="+encodeURIComponent(treeId)):"") + "#k=" + token; }
  function shareApi(action, extra){ var body={share:action}; if(!accountMode)body.passcode=passcode; if(extra)for(var k in extra)body[k]=extra[k];
    return fetch(treeEndpoint(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(body)}).then(function(r){return r.json();}); }
  function fillShare(j){ if(!j)return; $("shViewUrl").value=buildLink(j.viewToken); $("shEditUrl").value=buildLink(j.editToken); $("shareMsg").textContent=""; }
  function openShare(){
    if(!passcode && !accountMode){ toast(T("shareNeedSave")); openPasscode(); return; }
    $("shareTitle").textContent=T("shareTitle"); $("shareLede").textContent=T("shareLede");
    $("shViewLbl").textContent=T("shViewLbl"); $("shEditLbl").textContent=T("shEditLbl");
    $("shViewCopy").textContent=T("copy"); $("shEditCopy").textContent=T("copy");
    $("shRotate").textContent=T("shRotate"); $("shareDone").textContent=T("shareDone");
    $("shViewUrl").value=""; $("shEditUrl").value=""; $("shareMsg").textContent="…";
    $("shareModal").classList.add("open");
    shareApi("get").then(fillShare).catch(function(){ $("shareMsg").textContent=T("offline"); });
  }
  function closeShare(){ $("shareModal").classList.remove("open"); }
  function fallbackCopy(txt){ try{ var i=document.createElement("textarea"); i.value=txt; i.style.position="fixed"; i.style.opacity="0"; document.body.appendChild(i); i.focus(); i.select(); document.execCommand("copy"); document.body.removeChild(i); }catch(e){} }
  function copyText(txt,btn){ function done(){ var o=T("copy"); btn.textContent=T("copied"); toast(T("linkCopied")); setTimeout(function(){btn.textContent=o;},1400); }
    if(navigator.clipboard&&navigator.clipboard.writeText){ navigator.clipboard.writeText(txt).then(done).catch(function(){ fallbackCopy(txt); done(); }); }
    else { fallbackCopy(txt); done(); } }
  $("openShare").addEventListener("click",function(){ closePops(); openShare(); });
  $("shareClose").addEventListener("click",closeShare);
  $("shareDone").addEventListener("click",closeShare);
  $("shareModal").addEventListener("click",function(e){ if(e.target.id==="shareModal")closeShare(); });
  $("shViewCopy").addEventListener("click",function(){ if($("shViewUrl").value)copyText($("shViewUrl").value,this); });
  $("shEditCopy").addEventListener("click",function(){ if($("shEditUrl").value)copyText($("shEditUrl").value,this); });
  $("shRotate").addEventListener("click",function(){ if(!window.confirm(T("shRotateConfirm")))return; $("shareMsg").textContent="…"; shareApi("rotate").then(fillShare).catch(function(){ $("shareMsg").textContent=T("offline"); }); });
  document.addEventListener("click",function(){ closePops(); });

  /* ================= GEDCOM 5.5.1 export ================= */
  function gedText(s){ return String(s==null?"":s).replace(/\r?\n/g," ").trim(); }
  function gedDate(s){ s=gedText(s); if(!s)return ""; if(/^\d{4}$/.test(s))return s;
    var m=s.match(/^(\d{4})-(\d{2})-(\d{2})$/); if(m){ var mo=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"][+m[2]-1]; return (+m[3])+" "+mo+" "+m[1]; }
    return s; }
  function buildGEDCOM(){
    var ps=persons(); var lines=[];
    lines.push("0 HEAD"); lines.push("1 SOUR KazantzisTree"); lines.push("2 VERS 1"); lines.push("1 GEDC"); lines.push("2 VERS 5.5.1"); lines.push("2 FORM LINEAGE-LINKED"); lines.push("1 CHAR UTF-8");
    var idMap={}, n=0; ps.forEach(function(p){ n++; idMap[p.id]="I"+n; });
    // build families from partner pairs and from children's parent sets
    var fams=[], famKey={};
    function famFor(parents){ // parents: array of ids (1 or 2)
      var key=parents.slice().sort().join("|"); if(famKey[key]!=null)return famKey[key];
      var f={husb:null,wife:null,single:[],chil:[]};
      parents.forEach(function(pid){ var pp=P(pid); if(!pp)return; if(pp.sex==="m")f.husb=pid; else if(pp.sex==="f")f.wife=pid; else f.single.push(pid); });
      // assign unknown-sex parents to open slots
      f.single.forEach(function(pid){ if(!f.husb)f.husb=pid; else if(!f.wife)f.wife=pid; });
      famKey[key]=fams.length; fams.push(f); return famKey[key];
    }
    // partner-only couples
    ps.forEach(function(p){ (p.partners||[]).forEach(function(q){ if(q>p.id && P(q)) famFor([p.id,q]); }); });
    // children
    ps.forEach(function(c){ var par=(c.parents||[]).filter(function(x){return P(x);}); if(par.length){ var fi=famFor(par); fams[fi].chil.push(c.id); } });
    // INDI records
    ps.forEach(function(p){ var gid=idMap[p.id]; lines.push("0 @"+gid+"@ INDI");
      var en=gedText(p.nameEn), el=gedText(p.nameEl); var nmeta=en||el||"Unknown";
      var sur=gedText(p.maiden)||"Kazantzis";
      lines.push("1 NAME "+nmeta+" /"+sur+"/");
      if(el&&el!==en){ lines.push("2 ROMN "+en); }
      if(p.sex==="m")lines.push("1 SEX M"); else if(p.sex==="f")lines.push("1 SEX F");
      if(p.nick)lines.push("1 NAME "+gedText(p.nick)+"//"); // best-effort nickname
      var bd=gedDate(p.birth); if(bd||p.place){ lines.push("1 BIRT"); if(bd)lines.push("2 DATE "+bd); if(p.place)lines.push("2 PLAC "+gedText(p.place)); }
      var dd=gedDate(p.death); if(dd){ lines.push("1 DEAT"); lines.push("2 DATE "+dd); }
      (p.places||[]).forEach(function(ev){ if(!ev)return; var lbl=gedText(ev.label); var yr=gedDate(ev.year);
        lines.push("1 RESI"); if(ev.type)lines.push("2 TYPE "+gedText(ev.type)); if(yr)lines.push("2 DATE "+yr); if(lbl)lines.push("2 PLAC "+lbl); });
      if(p.notes)lines.push("1 NOTE "+gedText(p.notes));
      if(p.source)lines.push("1 SOUR "+gedText(p.source));
      // link to families
      fams.forEach(function(f,fi){ var fg="F"+(fi+1);
        if(f.husb===p.id||f.wife===p.id) lines.push("1 FAMS @"+fg+"@");
        if(f.chil.indexOf(p.id)>=0) lines.push("1 FAMC @"+fg+"@"); });
    });
    // FAM records
    fams.forEach(function(f,fi){ var fg="F"+(fi+1); lines.push("0 @"+fg+"@ FAM");
      if(f.husb&&idMap[f.husb])lines.push("1 HUSB @"+idMap[f.husb]+"@");
      if(f.wife&&idMap[f.wife])lines.push("1 WIFE @"+idMap[f.wife]+"@");
      f.chil.forEach(function(cid){ if(idMap[cid])lines.push("1 CHIL @"+idMap[cid]+"@"); });
    });
    lines.push("0 TRLR");
    return lines.join("\n")+"\n";
  }

  /* ================= Boot ================= */
  function applyServer(d){ if(!d)return; state.title=d.title||state.title; state.people=(d.people&&typeof d.people==="object")?d.people:{};
    state.config=(d.config&&typeof d.config==="object")?d.config:(state.config||{secondLang:"el",mono:false}); cfg();
    state.version=d.version||0; normalizePeople(); if(isMono())lang="en"; }
  paintChrome(); setEditMode(!!passcode); render(); applyTransform();
  if(!sessionStorage.getItem("kz_ui")) setTimeout(fit,40);

  function showPrivateGate(){
    if($("privateGate")) return;
    var g=document.createElement("div"); g.id="privateGate"; g.className="private-gate";
    g.innerHTML='<div class="pg-box"><svg viewBox="0 0 24 24" fill="none" class="pg-ic"><path d="M6 10V8a6 6 0 1112 0v2" stroke="currentColor" stroke-width="1.5"/><rect x="4.5" y="10" width="15" height="10" rx="2.2" stroke="currentColor" stroke-width="1.5"/></svg>'+
      '<h2>This tree is private</h2><p>Ask the family for a share link to view it.</p><button type="button" id="pgUnlock" class="btn" style="margin-top:16px">I have the family password</button></div>';
    document.body.appendChild(g);
    var _pgu=document.getElementById("pgUnlock"); if(_pgu){ _pgu.addEventListener("click",function(){ openPasscode(); }); }
  }
  fetch(treeEndpoint(),{cache:"no-store",headers:(function(){var h={};if(shareToken)h["x-tree-token"]=shareToken;if(!accountMode&&passcode)h["x-family-pass"]=passcode;return h;})()})
    .then(function(r){ return r.json().then(function(j){return {status:r.status,j:j};}).catch(function(){return {status:r.status,j:null};}); })
    .then(function(res){
      stripTokenFromUrl();
      if(res.status===401 && res.j && res.j.error==="private"){ showPrivateGate(); return; }
      var d=res.j;
      if(d && d.people!==undefined){
        applyServer(d);
        shareRole = d.role || "none";
        if(shareRole==="edit" && shareToken && !passcode){ shareEditToken=shareToken; setEditMode(true); }
        else if(accountMode && shareRole==="edit"){ setEditMode(true); }
        paintChrome(); render(); if(!sessionStorage.getItem("kz_ui"))fit();
      }
      // verify stored passcode quietly
      if(passcode){ fetch("/api/tree",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({passcode:passcode,verify:true})})
        .then(function(r){ if(r.status!==200){ passcode=""; try{localStorage.removeItem("kz_pass");}catch(e){} setEditMode(false); } }).catch(function(){}); }
    }).catch(function(){});

})();
