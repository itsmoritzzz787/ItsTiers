

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
  MyNameIsPuma: {
    name: "MyNameIsPuma",
    rank: "2.",
    title: "Combat Cadet",
    points: "43 points",
    tiers: [
      {icon:"vanilla", tier:"LT3"},
      {icon:"uhc", tier:"RLT3"},
      {icon:"smp", tier:"RLT3"},
      {icon:"sword", tier:"RHT4"},
      {icon:"nethop", tier:"RHT4"},
      {icon:"pot", tier:"RHT4"},
      {icon:"axe", tier:"RHT4"},
      {icon:"mace", tier:"RLT4"},
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"RLT4"},
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"RLT4"},
      
      
      
    ]
  },

  ItsMoritzzz: {
    name: "ItsMoritzzz",
    rank: "1.",
    title: "Combat Cadet",
    points: "57 points",
    tiers: [
      {icon:"mace", tier:"LT2"},
      {icon:"vanilla", tier:"LT3"},
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"LT3"},
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"LT3"},
      {icon:"sword", tier:"HT4"}, 
      {icon:"uhc", tier:"LT4"},
      {icon:"smp", tier:"LT4"},
      {icon:"nethop", tier:"LT4"},
      {icon:"pot", tier:"LT4"},
      {icon:"axe", tier:"LT4"},            
      
      
      
      
      
    ]
  },

  McNicho: {
    name: "McNicho",
    rank: "3.",
    title: "Combat Cadet",
    points: "35 points",
    tiers: [
      {icon:"mace", tier:"HT3"},      
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"LT4"},
      {icon:"sword", tier:"LT4"},
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"LT4"},
      {icon:"smp", tier:"HT5"},
      {icon:"pot", tier:"HT5"},
      {icon:"nethop", tier:"HT5"},
      {icon:"uhc", tier:"HT5"},      
      {icon:"axe", tier:"HT5"},
      {icon:"vanilla", tier:"RLT3"},
      
    ]
  },
 lozk00: {
    name: "lozk00",
    rank: "4.",
    title: "Combat Cadet",
    points: "26 points",
    tiers: [
      {icon:"sword", tier:"LT3"},
      {icon:"pot", tier:"LT3"}, 
      {icon:"mace", tier:"HT5"},      
      {icon:"nethop", tier:"HT5"},
      {icon:"axe", tier:"HT5"},
      {icon:"vanilla", tier:"LT5"},
      {icon:"smp", tier:"LT5"},
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"LT5"},      
      {icon:"uhc", tier:"-"},                                         
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"-"},
      
    ]
  },
 certifiedrid: {
    name: "certifiedrid",
    rank: "5.",
    title: "Combat Novice",
    points: "19 points",
    tiers: [
      {icon:"vanilla", tier:"LT3"},      
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"HT4"},
      {icon:"axe", tier:"LT4"},           
      {icon:"mace", tier:"LT4"},
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"LT4"},
      {icon:"nethop", tier:"-"},
      {icon:"smp", tier:"-"},
      {icon:"sword", tier:"-"},
      {icon:"pot", tier:"-"},    
      {icon:"uhc", tier:"-"},
    ]
  },
 zJixen: {
    name: "zJixen",
    rank: "6.",
    title: "Combat Novice",
    points: "16 points",
    tiers: [
      {icon:"pot", tier:"HT3"},
      {icon:"sword", tier:"LT3"},
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
  LordTrash13: {
    name: "LordTrash13",
    rank: "6.",
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
  Der_Schnee: {
    name: "Der_Schnee",
    rank: "6.",
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
  SocialRex11: {
    name: "SocialRex11",
    rank: "6.",
    title: "Combat Novice",
    points: "16 points",
    tiers: [
      {icon:"sword", tier:"LT4"},
      {icon:"vanilla", tier:"HT5"},
      {icon:"pot", tier:"HT5"},
      {icon:"axe", tier:"HT5"},
      {icon:"smp", tier:"HT5"},
      {icon:"mace", tier:"LT5"}, 
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"LT5"},     
      {icon:"nethop", tier:"LT5"},
      {icon:"uhc", tier:"LT5"},   
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"LT5"}
    ]
  },
 
  Epicfaik: {
    name: "Epicfaik",
    rank: "10.",
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
 MrMedoMC: {
    name: "MrMedoMC",
    rank: "10.",
    title: "Combat Novice",
    points: "13 points",
    tiers: [
      {icon:"vanilla", tier:"LT4"},
      {icon:"axe", tier:"HT5"},
      {icon:"sword", tier:"HT5"},
      {icon:"mace", tier:"HT5"},
      {icon:"uhc", tier:"LT5"},
      {icon:"smp", tier:"LT5"},
      {icon:"pot", tier:"LT5"},
      {icon:"nethop", tier:"LT5"},
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"-"},
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"-"}
      
      
    ]
  },
  Lloyd_The_M: {
    name: "Lloyd_The_M",
    rank: "12.",
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
 TheCronos_YT: {
    name: "TheCronos_YT",
    rank: "13.",
    title: "Combat Novice",
    points: "11 points",
    tiers: [
     {icon:"sword", tier:"HT5"},
     {icon:"mace", tier:"HT5"},
     {icon:"smp", tier:"LT5"},      
     {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"LT5"},
     {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"LT5"},     
     {icon:"pot", tier:"LT5"},
     {icon:"nethop", tier:"LT5"},
     {icon:"uhc", tier:"LT5"},
     {icon:"axe", tier:"LT5"},
     {icon:"vanilla", tier:"-"}
      
    ]
  },
  VampyWolf: {
    name: "VampyWolf",
    rank: "14.",
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
    rank: "14.",
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
  DieElfeFX: {
    name: "DieElfeFX",
    rank: "16.",
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
  Ginoski: {
    name: "Ginoski",
    rank: "17.",
    title: "Rookie",
    points: "8 points",
    tiers: [   
      {icon:"mace", tier:"HT4"},
      {icon:"https://subtiers.net/assets/trident-1c1a3e5a.svg", tier:"HT5"},
      {icon:"smp", tier:"LT5"},
      {icon:"nethop", tier:"LT5"},
      {icon:"https://cdn-icons-png.magnific.com/512/6428/6428889.png", tier:"-"},
      {icon:"sword", tier:"-"},
      {icon:"pot", tier:"-"},      
      {icon:"uhc", tier:"-"},
      {icon:"axe", tier:"-"},
      {icon:"vanilla", tier:"-"}
      
    ]
  },
 _Rafonix: {
    name: "_Rafonix",
    rank: "18.",
    title: "Rookie",
    points: "6 points",
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
  PVPSnapper: {
    name: "PVPSnapper",
    rank: "18.",
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
    rank: "18.",
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
 SolarPleasant: {
    name: "SolarPleasant",
    rank: "21.",
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
 xflxpsy: {
    name: "xflxpsy",
    rank: "22.",
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
    rank: "22.",
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
 FrozenBlack: {
    name: "FrozenBlack",
    rank: "24.",
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
    rank: "25.",
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
    rank: "26.",
    title: "Rookie",
    points: "0 points",
    tiers: [
      {icon:"uhc", tier:"-"},
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
