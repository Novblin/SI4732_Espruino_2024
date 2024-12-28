
g.clear();
g.drawImage(STOR.read("smallradio"),10,5);
g.setColor(-1).setFont("Vector",18).drawString("Espruino Radio",70,30);
eval(STOR.read("button.js"));

var BRIGHT=40;

var FMBUTTON = new Button("FM",0,70,50,30,()=>{load("fmapp.js");},20);
var AMBUTTON = new Button("AM",60,70,50,30,()=>{load("amapp.js");},20);
var SSBUTTON = new Button("SSB",120,70,50,30,()=>{load("ssbapp.js");},20);
var BRBUTTON = new Button("BR",180,70,50,30,()=>{changeBR();},20);

var ITEMS=[FMBUTTON,AMBUTTON,SSBUTTON,BRBUTTON];
var prevpos = 3;
var position = 3;

var v=getBattery().toFixed(1);
if (getBattery()<3.3){g.setColor(Orange);} else {g.setColor(Green);}
g.setFont("Vector",12).setFontAlign(-1,-1).drawString("BAT: "+v+"V",180,0,true);

var s = STOR.readJSON("brightness.json",1)||{"bright":10};
BRIGHT = s.bright;
brightness(BRIGHT/63);

function drawbr(){
	BUTTON.press = false;
	BRBUTTON.reset();
	BUTTON.fn = false;	
	var br=Math.round((BRIGHT/63)*100);
	g.setColor(-1).setFont("Vector",18).setFontAlign(0,-1).drawString("                   "+br+"%",120,110,true);
}
drawbr();

function changeBR (inc){
	BRBUTTON.reset();
	if (BRIGHT<3){ BRIGHT =3;}
	BRIGHT = BRIGHT+15;
	if (BRIGHT>63){ BRIGHT =3;}
	brightness(BRIGHT/63);
    drawbr();
	s.bright = BRIGHT; 
    STOR.writeJSON("brightness.json",s);
};

function move(inc){
        function mod(a,n) {return a>=n?a-n:a<0?a+n:a;}
        position=mod(position+inc,ITEMS.length);
        ITEMS[prevpos].focus(false);
        ITEMS[position].focus(true);
        prevpos=position;
    }
BUTTON.on("change",(d)=>{ITEMS[position].toggle(d);});

ROTARY.on("change",(inc)=>{move(inc);});  

for (var i=0;i<ITEMS.length;i++)	
  ITEMS[i].focus(i==position);

