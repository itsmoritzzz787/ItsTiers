

function closeProfile(){
 document.getElementById('popup').style.display='none';
}
document.querySelectorAll('.overall-player').forEach(card => {

  card.addEventListener('mouseenter', () => {
    card.style.transform = "translateY(-6px) scale(1.02)";
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = "translateY(0px) scale(1)";
  });

});
let currentIndex = 0;

function showKit(e, id) {
  const tabs = Array.from(document.querySelectorAll('.kit-tab'));
  const newIndex = tabs.indexOf(e.currentTarget);

  const direction = newIndex > currentIndex ? "right" : "left";

  document.querySelectorAll('.kit-content').forEach(el => {
    el.classList.remove('active', 'slide-left', 'slide-right');
  });

  const newKit = document.getElementById(id);

  newKit.classList.add('active');
  newKit.classList.add(direction === "right" ? 'slide-right' : 'slide-left');

  document.querySelectorAll('.kit-tab').forEach(tab => tab.classList.remove('active'));
  e.currentTarget.classList.add('active');

  currentIndex = newIndex;
}
const players = {
 

  ItsMoritzzz: {
    name: "ItsMoritzzz",
    rank: "2.",
    title: "Combat Specialist",
    points: "88 points",
    tiers: [
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"LT2"}, 
      {icon:"mace", tier:"LT2"},    
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"HT3"},
      {icon:"vanilla", tier:"LT3"},
      {icon:"pot", tier:"LT3"}, 
      {icon:"sword", tier:"LT3"}, 
      {icon:"uhc", tier:"HT4"},
      {icon:"smp", tier:"HT4"},
      {icon:"axe", tier:"HT4"}, 
      {icon:"nethop", tier:"HT4"},                                                                    
    ]
  }, 
 
  kasnnn: {
    name: "kasnnn",
    rank: "1.",
    title: "Combat Specialist",
    points: "90 points",
    tiers: [
      {icon:"sword", tier:"LT2"},
      {icon:"pot", tier:"HT3"},
      {icon:"nethop", tier:"HT3"}, 
      {icon:"uhc", tier:"HT3"},  
      {icon:"smp", tier:"HT3"},      
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"LT3"},                           
      {icon:"vanilla", tier:"LT3"},      
      {icon:"axe", tier:"LT3"},
      {icon:"mace", tier:"LT3"},      
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"LT3"}
    ]
  },
 ImMythical: {
    name: "ImMythical",
    rank: "3.",
    title: "Combat Specialist",
    points: "66 points",
    tiers: [
      {icon:"nethop", tier:"HT3"},
      {icon:"mace", tier:"HT3"}, 
      {icon:"sword", tier:"HT3"},     
      {icon:"uhc", tier:"LT3"},           
      {icon:"smp", tier:"LT3"},
      {icon:"pot", tier:"LT3"},
      {icon:"vanilla", tier:"LT3"},      
      {icon:"axe", tier:"LT3"},     
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"LT3"},
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"-"}
    ]
  },
  MyNameIsPuma: {
    name: "MyNameIsPuma",
    rank: "4.",
    title: "Combat Specialist",
    points: "51 points",
    tiers: [
      {icon:"sword", tier:"HT3"},
      {icon:"vanilla", tier:"LT3"},
      {icon:"smp", tier:"LT3"},
      {icon:"uhc", tier:"LT3"},
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"HT4"},
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"HT4"},            
      {icon:"nethop", tier:"HT4"},
      {icon:"pot", tier:"HT4"},
      {icon:"axe", tier:"HT4"},   
      {icon:"mace", tier:"LT4"},                            
    ]
  },
  McNicho: {
    name: "McNicho",
    rank: "5.",
    title: "Combat Cadet",
    points: "48 points",
    tiers: [     
      {icon:"vanilla", tier:"HT3"}, 
      {icon:"mace", tier:"HT3"},
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"LT3"},
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"LT3"}, 
      {icon:"sword", tier:"HT4"},              
      {icon:"smp", tier:"LT4"},
      {icon:"pot", tier:"HT5"},
      {icon:"nethop", tier:"HT5"},
      {icon:"uhc", tier:"HT5"},      
      {icon:"axe", tier:"HT5"},
           
    ]
  },
 shotss: {
    name: "4shotss",
    rank: "6.",
    title: "Combat Cadet",
    points: "46 points",
    tiers: [ 
      {icon:"sword", tier:"LT3"},
      {icon:"mace", tier:"LT3"},
      {icon:"pot", tier:"LT3"},   
      {icon:"smp", tier:"HT4"},
      {icon:"nethop", tier:"HT4"},  
      {icon:"axe", tier:"HT4"}, 
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"LT4"},      
      {icon:"vanilla", tier:"LT4"},
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"LT5"},                                   
      {icon:"uhc", tier:"HT5"},                  
      
      
    ]
  },

  
 Eliiiiaass: {
    name: "Eliiiiaass",
    rank: "7.",
    title: "Combat Novice",
    points: "44 points",
    tiers: [    
      {icon:"axe", tier:"LT3"},
      {icon:"smp", tier:"LT3"},
      {icon:"uhc", tier:"LT3"},
      {icon:"pot", tier:"LT3"},
      {icon:"sword", tier:"RLT2"},
      {icon:"mace", tier:"-"},
      {icon:"nethop", tier:"-"},                
      {icon:"vanilla", tier:"-"},            
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"-"},
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"-"}
    ]
  },
  certifiedrid: {
    name: "certifiedrid",
    rank: "8.",
    title: "Combat Cadet",
    points: "43 points",
    tiers: [   
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"LT3"},
      {icon:"vanilla", tier:"LT3"},
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"HT4"},
      {icon:"sword", tier:"HT4"},
      {icon:"nethop", tier:"HT4"},
      {icon:"pot", tier:"LT4"},
      {icon:"smp", tier:"LT4"},             
      {icon:"mace", tier:"LT4"},                  
      {icon:"uhc", tier:"HT5"}, 
      {icon:"axe", tier:"HT5"},  
    ]
  },
 KFCmuncher67: {
    name: "KFCmuncher67",
    rank: "9.",
    title: "Combat Cadet",
    points: "42 points",
    tiers: [
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"LT2"},
      {icon:"sword", tier:"LT3"}, 
      {icon:"mace", tier:"LT3"},
      {icon:"axe", tier:"LT3"},
      {icon:"vanilla", tier:"HT4"},
      {icon:"uhc", tier:"-"},      
      {icon:"nethop", tier:"-"},
      {icon:"smp", tier:"-"},
      {icon:"pot", tier:"-"},                     
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"-"}
    ]
  },
  GhostlyFatih: {
    name: "GhostlyFatih",
    rank: "9.",
    title: "Combat Cadet",
    points: "42 points",
    tiers: [
      {icon:"vanilla", tier:"LT3"},
      {icon:"sword", tier:"LT3"},
      {icon:"smp", tier:"LT3"},
      {icon:"pot", tier:"LT3"},      
      {icon:"mace", tier:"LT3"},
      {icon:"nethop", tier:"HT4"},
      {icon:"uhc", tier:"-"},          
      {icon:"axe", tier:"-"},
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"-"},
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"-"}
    ]
  },
 
 k4qx: {
    name: "k4qx",
    rank: "11.",
    title: "Combat Cadet",
    points: "39 points",
    tiers: [
      {icon:"sword", tier:"LT3"}, 
      {icon:"vanilla", tier:"LT3"},
      {icon:"nethop", tier:"LT3"},
      {icon:"pot", tier:"LT3"},
      {icon:"axe", tier:"HT4"},
      {icon:"mace", tier:"LT4"}, 
      {icon:"uhc", tier:"-"},     
      {icon:"smp", tier:"-"},           
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"-"},
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"-"}
    ]
  },
   Ginoski: {
    name: "Ginoski",
    rank: "12.",
    title: "Combat Cadet",
    points: "36 points",
    tiers: [  
      {icon:"vanilla", tier:"LT3"},
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"LT3"},
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"LT3"},
      {icon:"mace", tier:"LT3"}, 
      {icon:"sword", tier:"LT4"}, 
      {icon:"uhc", tier:"LT4"},
      {icon:"axe", tier:"HT5"},
      {icon:"pot", tier:"HT5"},                
      {icon:"smp", tier:"LT5"},
      {icon:"nethop", tier:"LT5"},
    ]
  }, 
  TwyCole: {
    name: "TwyCole",
    rank: "13.",
    title: "Combat Cadet",
    points: "34 points",
    tiers: [      
      {icon:"sword", tier:"LT2"},
      {icon:"vanilla", tier:"LT3"},
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"HT4"},
      {icon:"nethop", tier:"HT4"},
      {icon:"uhc", tier:"-"},
      {icon:"mace", tier:"-"},      
      {icon:"smp", tier:"-"},
      {icon:"pot", tier:"-"},           
      {icon:"axe", tier:"-"},      
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"-"}
    ]
  },
 Jonkler75: {
    name: "Jonkler75",
    rank: "13.",
    title: "Combat Cadet",
    points: "34 points",
    tiers: [
      {icon:"mace", tier:"LT3"},
      {icon:"vanilla", tier:"LT3"},
      {icon:"sword", tier:"LT3"},
      {icon:"uhc", tier:"LT3"}, 
      {icon:"smp", tier:"HT4"},
      {icon:"pot", tier:"HT4"},      
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"HT5"},
      {icon:"nethop", tier:"-"},                
      {icon:"axe", tier:"-"},      
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"-"}
    ]
  }, 
 SocialRex11: {
    name: "SocialRex11",
    rank: "13.",
    title: "Combat Cadet",
    points: "34 points",
    tiers: [  
      {icon:"vanilla", tier:"LT3"},
      {icon:"sword", tier:"LT3"},
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"HT4"}, 
      {icon:"mace", tier:"HT4"},
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"LT4"},           
      {icon:"pot", tier:"LT4"},
      {icon:"uhc", tier:"HT5"},      
      {icon:"nethop", tier:"HT5"},                       
      {icon:"axe", tier:"HT5"},
      {icon:"smp", tier:"HT5"},                             
    ]
  }, 
 Gold3n__: {
    name: "Gold3n__",
    rank: "13.",
    title: "Combat Cadet",
    points: "34 points",
    tiers: [   
      {icon:"sword", tier:"HT3"},
      {icon:"nethop", tier:"LT3"},
      {icon:"smp", tier:"LT3"},      
      {icon:"pot", tier:"LT3"},       
      {icon:"axe", tier:"HT5"},      
      {icon:"uhc", tier:"HT5"},
      {icon:"vanilla", tier:"LT5"}, 
      {icon:"mace", tier:"LT5"},         
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"-"},
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"-"}
    ]
  },


  lozk00: {
    name: "lozk00",
    rank: "17.",
    title: "Combat Cadet",
    points: "31 points",
    tiers: [
      {icon:"sword", tier:"LT3"},
      {icon:"pot", tier:"LT3"},
      {icon:"nethop", tier:"HT4"},
      {icon:"mace", tier:"LT4"},
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"LT4"},            
      {icon:"vanilla", tier:"HT5"},
      {icon:"smp", tier:"HT5"}, 
      {icon:"axe", tier:"HT5"},
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"LT5"},
      {icon:"uhc", tier:"LT5"},
                  
                                                               
    ]
  },
  
  EvilWcooks: {
    name: "EvilWcooks",
    rank: "18.",
    title: "Combat Cadet",
    points: "30 points",
    tiers: [   
      {icon:"nethop", tier:"LT3"},
      {icon:"smp", tier:"LT3"},      
      {icon:"pot", tier:"LT3"}, 
      {icon:"sword", tier:"HT4"},            
      {icon:"uhc", tier:"HT4"},       
      {icon:"mace", tier:"HT4"},  
      {icon:"axe", tier:"-"},
      {icon:"vanilla", tier:"-"}, 
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"-"},
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"-"}
    ]
  },
 Joredium: {
    name: "Joredium",
    rank: "19.",
    title: "Combat Cadet",
    points: "25 points",
    tiers: [
      {icon:"sword", tier:"LT3"},
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"HT4"},      
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"HT5"},
      {icon:"pot", tier:"HT5"}, 
      {icon:"vanilla", tier:"HT5"},
      {icon:"smp", tier:"HT5"},      
      {icon:"nethop", tier:"HT5"},
      {icon:"axe", tier:"LT5"},
      {icon:"uhc", tier:"LT5"},
      {icon:"mace", tier:"LT5"},       
    ]
  },
 ImRedlin: {
    name: "ImRedlin",
    rank: "19.",
    title: "Combat Cadet",
    points: "25 points",
    tiers: [
      {icon:"vanilla", tier:"LT3"}, 
      {icon:"nethop", tier:"LT3"},
      {icon:"uhc", tier:"LT3"},
      {icon:"sword", tier:"HT4"},
      {icon:"mace", tier:"LT4"},      
      {icon:"smp", tier:"-"},
      {icon:"pot", tier:"-"},           
      {icon:"axe", tier:"-"},
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"-"},
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"-"}
    ]
  },
 
 TREN: {
    name: "1TREN",
    rank: "21.",
    title: "Combat Cadet",
    points: "24 points",
    tiers: [   
      {icon:"nethop", tier:"HT4"},
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"LT4"},
      {icon:"sword", tier:"LT4"},
      {icon:"pot", tier:"LT4"}, 
      {icon:"axe", tier:"HT5"},
      {icon:"smp", tier:"HT5"},
      {icon:"vanilla", tier:"HT5"}, 
      {icon:"mace", tier:"HT5"},
      {icon:"uhc", tier:"-"},                                     
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"-"}
    ]
  },
 ySw1ft: {
    name: "ySw1ft",
    rank: "22.",
    title: "Combat Cadet",
    points: "23 points",
    tiers: [
      {icon:"sword", tier:"HT3"},
      {icon:"pot", tier:"HT3"},
      {icon:"nethop", tier:"LT4"},
      {icon:"uhc", tier:"-"},
      {icon:"mace", tier:"-"},      
      {icon:"smp", tier:"-"},      
      {icon:"vanilla", tier:"-"},      
      {icon:"axe", tier:"-"},
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"-"},
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"-"}
    ]
  },
 muhOnCeiling: {
    name: "muhOnCeiling",
    rank: "23.",
    title: "Combat Cadet",
    points: "20 points",
    tiers: [
      {icon:"mace", tier:"LT2"},
      {icon:"uhc", tier:"-"},
      {icon:"sword", tier:"-"},
      {icon:"nethop", tier:"-"},
      {icon:"smp", tier:"-"},
      {icon:"pot", tier:"-"},
      {icon:"vanilla", tier:"-"},      
      {icon:"axe", tier:"-"},
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"-"},
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"-"}
    ]
  },
  
   BartekGaming383: {
    name: "BartekGaming383",
    rank: "23.",
    title: "Combat Cadet",
    points: "20 points",
    tiers: [
      {icon:"sword", tier:"LT3"},
      {icon:"mace", tier:"HT4"},
      {icon:"nethop", tier:"LT4"},
      {icon:"pot", tier:"HT5"},
      {icon:"smp", tier:"HT5"}, 
      {icon:"vanilla", tier:"LT5"},
      {icon:"uhc", tier:"LT5"}, 
      {icon:"axe", tier:"LT5"},                                
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"-"},
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"-"}
    ]
  },
 
 _jumpingbean_: {
    name: "_jumpingbean_",
    rank: "25.",
    title: "Combat Novice",
    points: "18 points",
    tiers: [
      {icon:"smp", tier:"LT3"},      
      {icon:"sword", tier:"LT3"},
      {icon:"mace", tier:"LT3"},  
      {icon:"uhc", tier:"-"},
      {icon:"nethop", tier:"-"},
      {icon:"pot", tier:"-"},
      {icon:"vanilla", tier:"-"},      
      {icon:"axe", tier:"-"},
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"-"},
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"-"}
    ]
  },
 Imjett_: {
    name: "Imjett_",
    rank: "26.",
    title: "Combat Novice",
    points: "16 points",
    tiers: [
      {icon:"vanilla", tier:"LT3"},
      {icon:"uhc", tier:"HT4"},      
      {icon:"mace", tier:"HT5"}, 
      {icon:"sword", tier:"LT5"},
      {icon:"nethop", tier:"-"},
      {icon:"smp", tier:"-"},
      {icon:"pot", tier:"-"},            
      {icon:"axe", tier:"-"},
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"-"},
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"-"}
    ]
  },
 MrmedoMC: {
    name: "MrmedoMC",
    rank: "26.",
    title: "Combat Novice",
    points: "16 points",
    tiers: [
      {icon:"vanilla", tier:"HT4"},      
      {icon:"sword", tier:"HT5"},
      {icon:"mace", tier:"HT5"},
      {icon:"axe", tier:"LT5"},
      {icon:"smp", tier:"LT5"},
      {icon:"uhc", tier:"LT5"},      
      {icon:"pot", tier:"LT5"},
      {icon:"nethop", tier:"LT5"},
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"-"},
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"-"}            
    ]
  },
  LordTrash13: {
    name: "LordTrash13",
    rank: "26.",
    title: "Combat Novice",
    points: "16 points",
    tiers: [
      {icon:"nethop", tier:"LT3"},
      {icon:"smp", tier:"HT4"},
      {icon:"sword", tier:"LT4"},
      {icon:"pot", tier:"LT4"},
      {icon:"mace", tier:"-"},
      {icon:"vanilla", tier:"-"},      
      {icon:"axe", tier:"-"},
      {icon:"uhc", tier:"-"},
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"-"},
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"-"}
    ]
  },
  ItzSncw: {
    name: "ItzSncw",
    rank: "26.",
    title: "Combat Novice",
    points: "16 points",
    tiers: [
      {icon:"uhc", tier:"LT4"},
      {icon:"sword", tier:"LT4"},
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"LT4"},
      {icon:"mace", tier:"HT5"},
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"HT5"},
      {icon:"smp", tier:"HT5"},
      {icon:"vanilla", tier:"LT5"},
      {icon:"pot", tier:"-"},
      {icon:"nethop", tier:"-"},
      {icon:"axe", tier:"-"},       
    ]
  },
 TheCronos_YT: {
    name: "TheCronos_YT",
    rank: "26.",
    title: "Combat Novice",
    points: "16 points",
    tiers: [
     {icon:"sword", tier:"LT4"},
     {icon:"pot", tier:"HT5"},
     {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"HT5"},        
     {icon:"mace", tier:"HT5"},
     {icon:"axe", tier:"LT5"},
     {icon:"vanilla", tier:"LT5"},
     {icon:"smp", tier:"LT5"},          
     {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"LT5"},          
     {icon:"nethop", tier:"LT5"},
     {icon:"uhc", tier:"LT5"},
     
      
    ]
  },
  emielie14: {
    name: "emielie14",
    rank: "31.",
    title: "Combat Novice",
    points: "15 points",
    tiers: [
      {icon:"vanilla", tier:"LT3"},      
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"HT4"},
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"HT5"},
      {icon:"mace", tier:"HT5"},
      {icon:"axe", tier:"LT5"},  
      {icon:"sword", tier:"-"},
      {icon:"uhc", tier:"-"},      
      {icon:"nethop", tier:"-"},
      {icon:"smp", tier:"-"},
      {icon:"pot", tier:"-"},                        
      
    ]
  },
  SigsAhoy: {
    name: "SigsAhoy",
    rank: "32.",
    title: "Combat Novice",
    points: "14 points",
    tiers: [
      {icon:"smp", tier:"LT3"},
      {icon:"pot", tier:"HT4"},
      {icon:"uhc", tier:"HT4"},
      {icon:"mace", tier:"-"},
      {icon:"nethop", tier:"-"},
      {icon:"sword", tier:"-"},      
      {icon:"vanilla", tier:"-"},      
      {icon:"axe", tier:"-"},
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"-"},
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"-"}
    ]
  },
 zNixls_: {
    name: "zNixls_",
    rank: "32.",
    title: "Combat Novice",
    points: "14 points",
    tiers: [
      {icon:"sword", tier:"HT3"},
      {icon:"pot", tier:"HT4"},
      {icon:"uhc", tier:"-"},
      {icon:"mace", tier:"-"},
      {icon:"nethop", tier:"-"},
      {icon:"smp", tier:"-"},      
      {icon:"vanilla", tier:"-"},      
      {icon:"axe", tier:"-"},
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"-"},
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"-"}
    ]
  },
  Epicfaik: {
    name: "Epicfaik",
    rank: "34.",
    title: "Combat Novice",
    points: "13 points",
    tiers: [
      {icon:"mace", tier:"HT3"},
      {icon:"vanilla", tier:"LT4"}, 
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"-"},
      {icon:"nethop", tier:"-"},
      {icon:"smp", tier:"-"},
      {icon:"sword", tier:"-"},
      {icon:"pot", tier:"-"},           
      {icon:"axe", tier:"-"},
      {icon:"uhc", tier:"-"},      
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"-"}
    ]
  },
 
 Meloy_: {
    name: "Meloy_",
    rank: "35.",
    title: "Combat Novice",
    points: "12 points",
    tiers: [
      {icon:"sword", tier:"HT4"},
      {icon:"vanilla", tier:"LT4"},
      {icon:"mace", tier:"LT4"},
      {icon:"axe", tier:"HT5"},
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"-"},
      {icon:"nethop", tier:"-"},
      {icon:"smp", tier:"-"},      
      {icon:"pot", tier:"-"},                  
      {icon:"uhc", tier:"-"},   
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"-"}
    ]
  },
 
  Lloyd_The_M: {
    name: "Lloyd_The_M",
    rank: "35.",
    title: "Combat Novice",
    points: "12 points",
    tiers: [
      {icon:"smp", tier:"HT5"},
      {icon:"mace", tier:"HT5"},
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"HT5"},
      {icon:"vanilla", tier:"LT5"},
      {icon:"pot", tier:"LT5"},
      {icon:"nethop", tier:"LT5"},
      {icon:"uhc", tier:"LT5"},
      {icon:"axe", tier:"LT5"},
      {icon:"sword", tier:"LT5"},
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"-"}
    ]
  },
 
 Sn00wies: {
    name: "Sn00wies",
    rank: "37.",
    title: "Combat Novice",
    points: "10 points",
    tiers: [
      {icon:"sword", tier:"LT3"},
      {icon:"uhc", tier:"-"},
      {icon:"mace", tier:"-"},
      {icon:"nethop", tier:"-"},
      {icon:"smp", tier:"-"},
      {icon:"pot", tier:"-"},
      {icon:"vanilla", tier:"-"},      
      {icon:"axe", tier:"-"},
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"-"},
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"-"}
    ]
  },
  Wizo_X_extra: {
    name: "Wizo_X_extra",
    rank: "37.",
    title: "Combat Novice",
    points: "10 points",
    tiers: [
      {icon:"vanilla", tier:"LT4"},
      {icon:"mace", tier:"LT4"},
      {icon:"axe", tier:"HT5"},
      {icon:"uhc", tier:"HT5"},   
      {icon:"sword", tier:"-"},      
      {icon:"nethop", tier:"-"},
      {icon:"smp", tier:"-"},
      {icon:"pot", tier:"-"},                 
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"-"},
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"-"}
    ]
  },
 FemboyCebulamen: {
    name: "FemboyCebulamen",
    rank: "37.",
    title: "Combat Novice",
    points: "10 points",
    tiers: [
      {icon:"sword", tier:"HT3"},
      {icon:"uhc", tier:"-"},
      {icon:"mace", tier:"-"},
      {icon:"nethop", tier:"-"},
      {icon:"smp", tier:"-"},
      {icon:"pot", tier:"-"},
      {icon:"vanilla", tier:"-"},      
      {icon:"axe", tier:"-"},
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"-"},
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"-"}
    ]
  },
  VampyWolf: {
    name: "VampyWolf",
    rank: "37.",
    title: "Combat Novice",
    points: "10 points",
    tiers: [
      {icon:"mace", tier:"HT4"},     
      {icon:"nethop", tier:"-"},
      {icon:"smp", tier:"-"},
      {icon:"sword", tier:"-"},
      {icon:"pot", tier:"-"},
      {icon:"vanilla", tier:"-"},      
      {icon:"axe", tier:"-"},
      {icon:"uhc", tier:"-"},
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"-"},
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"-"}
    ]
  },    
  McFaBaZaaRoh1MB: {
    name: "McFaBaZaaRoh1MB",
    rank: "37.",
    title: "Combat Novice",
    points: "10 points",
    tiers: [
      {icon:"mace", tier:"LT3"},
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"HT4"},
      {icon:"nethop", tier:"-"},
      {icon:"smp", tier:"-"},
      {icon:"sword", tier:"-"},
      {icon:"pot", tier:"-"},
      {icon:"vanilla", tier:"-"},      
      {icon:"axe", tier:"-"},
      {icon:"uhc", tier:"-"},      
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"-"}
    ]
  },
 swnxzx: {
    name: "swnxzx",
    rank: "42.",
    title: "Rookie",
    points: "9 points",
    tiers: [         
      {icon:"sword", tier:"HT4"},
      {icon:"nethop", tier:"HT5"},
      {icon:"pot", tier:"LT4"},
      {icon:"smp", tier:"-"},
      {icon:"mace", tier:"-"},
      {icon:"vanilla", tier:"-"},      
      {icon:"axe", tier:"-"},
      {icon:"uhc", tier:"-"},
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"-"},
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"-"}
    ]
  },
  DieElfeFX: {
    name: "DieElfeFX",
    rank: "42.",
    title: "Rookie",
    points: "9 points",
    tiers: [
      {icon:"uhc", tier:"LT4"},
      {icon:"mace", tier:"LT4"},
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"LT4"},
      {icon:"nethop", tier:"-"},
      {icon:"smp", tier:"-"},
      {icon:"sword", tier:"-"},
      {icon:"pot", tier:"-"},
      {icon:"vanilla", tier:"-"},      
      {icon:"axe", tier:"-"},            
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"-"}
    ]
  },  
 
  KoksikSzef: {
    name: "KoksikSzef",
    rank: "44.",
    title: "Rookie",
    points: "8 points",
    tiers: [
      {icon:"vanilla", tier:"LT4"}, 
      {icon:"sword", tier:"LT3"},      
      {icon:"pot", tier:"HT5"}, 
      {icon:"nethop", tier:"LT5"},
      {icon:"mace", tier:"-"},
      {icon:"uhc", tier:"-"},          
      {icon:"smp", tier:"-"},                
      {icon:"axe", tier:"-"},
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"-"},
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"-"}
    ]
  },
 Sm1targusPrimus: {
    name: "Sm1targusPrimus",
    rank: "45.",
    title: "Rookie",
    points: "7 points",
    tiers: [
      {icon:"sword", tier:"HT4"},
      {icon:"mace", tier:"LT4"},
      {icon:"uhc", tier:"-"},      
      {icon:"nethop", tier:"-"},
      {icon:"smp", tier:"-"},
      {icon:"pot", tier:"-"},
      {icon:"vanilla", tier:"-"},      
      {icon:"axe", tier:"-"},
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"-"},
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"-"}
    ]
  },
  Fr0gified: {
    name: "Fr0gified",
    rank: "45.",
    title: "Rookie",
    points: "7 points",
    tiers: [
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"LT4"},
      {icon:"uhc", tier:"HT5"},
      {icon:"mace", tier:"LT5"},      
      {icon:"sword", tier:"-"},
      {icon:"nethop", tier:"-"},
      {icon:"smp", tier:"-"},
      {icon:"pot", tier:"-"},
      {icon:"vanilla", tier:"-"},      
      {icon:"axe", tier:"-"},      
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"-"}
    ]
  },
   zeno_HT5: {
    name: "zeno_HT5",
    rank: "45.",
    title: "Rookie",
    points: "7 points",
    tiers: [
      {icon:"vanilla", tier:"LT3"},
      {icon:"mace", tier:"LT5"},
      {icon:"uhc", tier:"-"},     
      {icon:"nethop", tier:"-"},
      {icon:"smp", tier:"-"},
      {icon:"sword", tier:"-"},
      {icon:"pot", tier:"-"},            
      {icon:"axe", tier:"-"},
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"-"},
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"-"}
    ]
  },
 ItzK1RBE: {
    name: "ItzK1RBE",
    rank: "48.",
    title: "Rookie",
    points: "6 points",
    tiers: [
      {icon:"vanilla", tier:"LT3"},
      {icon:"mace", tier:"-"},
      {icon:"uhc", tier:"-"},      
      {icon:"nethop", tier:"-"},
      {icon:"smp", tier:"-"},
      {icon:"pot", tier:"-"},
      {icon:"sword", tier:"-"},      
      {icon:"axe", tier:"-"},
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"-"},
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"-"}
    ]
  },
 bombertobi: {
    name: "bombertobi",
    rank: "48.",
    title: "Rookie",
    points: "6 points",
    tiers: [
      {icon:"sword", tier:"LT3"},
      {icon:"mace", tier:"-"},
      {icon:"uhc", tier:"-"},      
      {icon:"nethop", tier:"-"},
      {icon:"smp", tier:"-"},
      {icon:"pot", tier:"-"},
      {icon:"vanilla", tier:"-"},      
      {icon:"axe", tier:"-"},
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"-"},
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"-"}
    ]
  },
  ______OO______: {
    name: "______OO______",
    rank: "48.",
    title: "Rookie",
    points: "6 points",
    tiers: [
      {icon:"vanilla", tier:"LT3"},
      {icon:"mace", tier:"-"},
      {icon:"uhc", tier:"-"},      
      {icon:"nethop", tier:"-"},
      {icon:"smp", tier:"-"},
      {icon:"pot", tier:"-"},
      {icon:"sword", tier:"-"},      
      {icon:"axe", tier:"-"},
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"-"},
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"-"}
    ]
  },
 ytgabereal: {
    name: "ytgabereal",
    rank: "48.",
    title: "Rookie",
    points: "6 points",
    tiers: [
      {icon:"smp", tier:"LT3"},
      {icon:"mace", tier:"-"},
      {icon:"uhc", tier:"-"},      
      {icon:"nethop", tier:"-"},
      {icon:"vanilla", tier:"-"},
      {icon:"pot", tier:"-"},
      {icon:"sword", tier:"-"},      
      {icon:"axe", tier:"-"},
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"-"},
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"-"}
    ]
  },
  PVPSnapper: {
    name: "PVPSnapper",
    rank: "48.",
    title: "Rookie",
    points: "6 points",
    tiers: [
      {icon:"smp", tier:"HT5"},
      {icon:"sword", tier:"HT5"},
      {icon:"mace", tier:"LT5"},
      {icon:"uhc", tier:"LT5"},
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"-"},
      {icon:"nethop", tier:"-"},     
      {icon:"pot", tier:"-"},
      {icon:"vanilla", tier:"-"},      
      {icon:"axe", tier:"-"},      
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"-"}
    ]
  },
 Elias117347: {
    name: "Elias117347",
    rank: "48.",
    title: "Rookie",
    points: "6 points",
    tiers: [
      {icon:"sword", tier:"LT4"},
      {icon:"uhc", tier:"HT5"},
      {icon:"mace", tier:"LT5"},
      {icon:"nethop", tier:"-"},
      {icon:"smp", tier:"-"},
      {icon:"pot", tier:"-"},
      {icon:"vanilla", tier:"-"},      
      {icon:"axe", tier:"-"},
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"-"},
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"-"}
    ]
  },
  Spooky1904: {
    name: "Spooky1904",
    rank: "54.",
    title: "Rookie",
    points: "5 points",
    tiers: [
      {icon:"sword", tier:"LT4"},
      {icon:"vanilla", tier:"LT5"},
      {icon:"mace", tier:"LT5"},
      {icon:"uhc", tier:"-"},      
      {icon:"nethop", tier:"-"},
      {icon:"smp", tier:"-"},
      {icon:"pot", tier:"-"},            
      {icon:"axe", tier:"-"},
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"-"},
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"-"}
    ]
  },
 
 SkinPunktexe: {
    name: "SkinPunktexe",
    rank: "55.",
    title: "Rookie",
    points: "4 points",
    tiers: [
      {icon:"sword", tier:"HT4"},
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"-"},
      {icon:"nethop", tier:"-"},
      {icon:"smp", tier:"-"},
      {icon:"mace", tier:"-"},
      {icon:"pot", tier:"-"},
      {icon:"vanilla", tier:"-"},      
      {icon:"axe", tier:"-"},
      {icon:"uhc", tier:"-"},   
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"-"}
    ]
  },
 pawkitty: {
    name: "pawkitty",
    rank: "55.",
    title: "Rookie",
    points: "4 points",
    tiers: [      
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"HT4"},
      {icon:"sword", tier:"-"},
      {icon:"nethop", tier:"-"},
      {icon:"smp", tier:"-"},
      {icon:"mace", tier:"-"},
      {icon:"pot", tier:"-"},
      {icon:"vanilla", tier:"-"},      
      {icon:"axe", tier:"-"},
      {icon:"uhc", tier:"-"},   
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"-"}
    ]
  },
  
 SolarPleasant: {
    name: "SolarPleasant",
    rank: "55.",
    title: "Rookie",
    points: "4 points",
    tiers: [
      {icon:"mace", tier:"HT4"},
      {icon:"uhc", tier:"-"},
      {icon:"sword", tier:"-"},
      {icon:"nethop", tier:"-"},
      {icon:"smp", tier:"-"},
      {icon:"pot", tier:"-"},
      {icon:"vanilla", tier:"-"},      
      {icon:"axe", tier:"-"},
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"-"},
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"-"}
    ]
  },
 ch1lln: {
    name: "ch1lln",
    rank: "55.",
    title: "Rookie",
    points: "4 points",
    tiers: [
      {icon:"smp", tier:"HT4"},
      {icon:"uhc", tier:"-"},
      {icon:"sword", tier:"-"},
      {icon:"nethop", tier:"-"},
      {icon:"mace", tier:"-"},
      {icon:"pot", tier:"-"},
      {icon:"vanilla", tier:"-"},      
      {icon:"axe", tier:"-"},
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"-"},
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"-"}
    ]
  },
 xflxpsy: {
    name: "xflxpsy",
    rank: "55.",
    title: "Rookie",
    points: "4 points",
    tiers: [
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"HT5"},
      {icon:"mace", tier:"HT5"},
      {icon:"sword", tier:"-"},
      {icon:"uhc", tier:"-"},
      {icon:"nethop", tier:"-"},
      {icon:"smp", tier:"-"},
      {icon:"pot", tier:"-"},
      {icon:"vanilla", tier:"-"},      
      {icon:"axe", tier:"-"}, 
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"-"}
    ]
  },
  _DasEntchen_: {
    name: "_DasEntchen_",
    rank: "55.",
    title: "Rookie",
    points: "4 points",
    tiers: [
      {icon:"sword", tier:"HT4"},
      {icon:"uhc", tier:"-"},
      {icon:"mace", tier:"-"},
      {icon:"nethop", tier:"-"},
      {icon:"smp", tier:"-"},
      {icon:"pot", tier:"-"},
      {icon:"vanilla", tier:"-"},      
      {icon:"axe", tier:"-"},
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"-"},
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"-"}
    ]
  },
 
 M4rkiski: {
    name: "M4rkiski",
    rank: "61.",
    title: "Rookie",
    points: "3 points",
    tiers: [
      {icon:"uhc", tier:"LT4"},
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"-"},
      {icon:"nethop", tier:"-"},
      {icon:"smp", tier:"-"},
      {icon:"mace", tier:"-"},
      {icon:"pot", tier:"-"},
      {icon:"vanilla", tier:"-"},      
      {icon:"axe", tier:"-"},
      {icon:"sword", tier:"-"},   
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"-"}
    ]
  },
 
 FrozenBlack: {
    name: "FrozenBlack",
    rank: "61.",
    title: "Rookie",
    points: "3 points",
    tiers: [
      {icon:"mace", tier:"LT4"},
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"-"},
      {icon:"nethop", tier:"-"},
      {icon:"smp", tier:"-"},
      {icon:"sword", tier:"-"},
      {icon:"pot", tier:"-"},
      {icon:"vanilla", tier:"-"},      
      {icon:"axe", tier:"-"},
      {icon:"uhc", tier:"-"},   
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"-"}
    ]
  },
  hallo663: {
    name: "hallo663",
    rank: "63.",
    title: "Rookie",
    points: "2 points",
    tiers: [
      {icon:"uhc", tier:"HT5"},
      {icon:"mace", tier:"-"},
      {icon:"nethop", tier:"-"},
      {icon:"smp", tier:"-"},
      {icon:"sword", tier:"-"},
      {icon:"pot", tier:"-"},
      {icon:"vanilla", tier:"-"},      
      {icon:"axe", tier:"-"},
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"-"},
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"-"}
    ]
  },
   ShieldlessStray: {
    name: "ShieldlessStray",
    rank: "63.",
    title: "Rookie",
    points: "2 points",
    tiers: [
      {icon:"mace", tier:"HT5"},
      {icon:"uhc", tier:"-"},     
      {icon:"nethop", tier:"-"},
      {icon:"smp", tier:"-"},
      {icon:"sword", tier:"-"},
      {icon:"pot", tier:"-"},
      {icon:"vanilla", tier:"-"},      
      {icon:"axe", tier:"-"},
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"-"},
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"-"}
    ]
  },
  nuuhx: {
    name: "nuuhx",
    rank: "65.",
    title: "Rookie",
    points: "1 points",
    tiers: [
      {icon:"mace", tier:"LT5"},
      {icon:"uhc", tier:"-"},     
      {icon:"nethop", tier:"-"},
      {icon:"smp", tier:"-"},
      {icon:"sword", tier:"-"},
      {icon:"pot", tier:"-"},
      {icon:"vanilla", tier:"-"},      
      {icon:"axe", tier:"-"},
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"-"},
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"-"}
    ]
  },
 
 
};


function openProfile(name) {
  const player = players[name];
  if (!player) return;

  document.getElementById("popup").style.display = "flex";

  /* NAME */
  document.getElementById("popup-name").innerText = player.name;

  /* SKIN */
  document.getElementById("popup-skin").src =
    `https://render.crafty.gg/3d/bust/${player.name}`;

  /* INFO */
  document.getElementById("popup-rank").innerText = player.rank;
  document.getElementById("popup-title").innerText = player.title;
  document.getElementById("popup-points").innerText = player.points;

  /* TOP 3 FARBEN */
  const rankEl = document.getElementById("popup-rank");

  rankEl.classList.remove("gold", "silver", "bronze");

  if (player.rank.trim() === "1.") {
    rankEl.classList.add("gold");
  }
  else if (player.rank.trim() === "2.") {
    rankEl.classList.add("silver");
  }
  else if (player.rank.trim() === "3.") {
    rankEl.classList.add("bronze");
  }

  /* TIERS */
  const container = document.getElementById("popup-tiers");
  container.innerHTML = "";

  player.tiers.forEach(t => {

    const el = document.createElement("div");
    el.className = "kit-item";

    const iconSrc = t.icon.startsWith("http")
      ? t.icon
      : `https://mctiers.com/tier_icons/${t.icon}.svg`;

    el.innerHTML = `
      <div class="icon ${t.tier.toLowerCase()}">
        <img src="${iconSrc}">
      </div>

      <span class="label ${t.tier.toLowerCase()}">
        ${t.tier}
      </span>
    `;

    container.appendChild(el);
  });
}

function closeProfile() {
  document.getElementById("popup").style.display = "none";
}


document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".player, .overall-player").forEach(el => {
    el.addEventListener("click", () => {
      const name = el.innerText.split("\n")[0].trim();
      openProfile(name);
    });
  });
});
document.querySelectorAll('.kit-item').forEach(el => {
  const text = el.getAttribute('data-tooltip');
  if (text && text.includes('|')) {
    el.setAttribute('data-tooltip', text.replace('|', '\n'));
  }
});
document.getElementById("playerSearch").addEventListener("keydown", function(e){

  if(e.key !== "Enter") return;

  const search = this.value.toLowerCase();

  const player = players.find(p =>
    p.name.toLowerCase() === search
  );

  if(player){
    openProfile(player);
    this.value = "";
  }
});
document
.getElementById("playerSearch")
.addEventListener("keydown", function(e){

  if(e.key !== "Enter") return;

  const input = this.value.toLowerCase().trim();

  const playerKey = Object.keys(players).find(key =>
    players[key].name.toLowerCase().includes(input)
  );

  if(playerKey){
    openProfile(playerKey);
  }
});
