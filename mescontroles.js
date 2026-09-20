// JavaScript Document

function charger(x)
{video=document.getElementById("vid")
 video.src=x+".mp4"
 if (x=="ham")
 {document.getElementById("des").innerHTML="hammemet dra chbeha"}
 else if(x=="jam")
	 {document.getElementById("des").innerHTML="jam dra chbeha"}
 else
	 {document.getElementById("des").innerHTML="sbitla dra chbha"}
 
	
}
function afficher(w)
{if (w=="oui")
{document.getElementById("nom").disabled=false
 document.getElementById("passeport").disabled=false
 

}
 else
	{
 document.getElementById("nom").disabled=true
 document.getElementById("passeport").disabled=true}
	
}
function calculer()
{dd=new Date(document.getElementById("dateDebut").value)
 df=new Date(document.getElementById("dateFin").value)
 
 p=Math.trunc((df-dd)/(1000*60*60*24*120))
 document.getElementById("prix").value=p
 
 
	
}
function verif()
{nom=document.getElementById("nom").value
 np=document.getElementById("passeport").value
 d=document.getElementById("destination").selectedIndex
 mp=document.getElementById("motdepasse").value
 nc=document.getElementById("numcarte").value
 dv=document.getElementById("datevalidation").value
 csv=document.getElementById("csv").value
 sp="@#$%^^&***())))___)/*-+<>,,"
 if(!nom.length==intervalle(nom.toUpperCase,"A","Z")+intervalle(nom," "," ")|| ch[Math.trunc(ch.length/2)]!=" "||(document.getElementById("nouveau").checked)||nom=="")
	{return false}
  if (!np.length==intervalle(np.toUpperCase,"A","Z")+intervalle(np,0,9) && np.length<6)
 {return false}
 if(speciaux(mp)==false||document.getElementById("motdepasse").checked||mp==""
	{return false
	
	}
 if(d==-1)
	 {return false}
 if()
}
	
	

function intervalle(ch,a,b)
{nb=0
 for(i=0;i<ch.length;i++)
	 {if (b<=ch[i]<=a)
	  {
		  nb=nb+1
	  }
		 
	 }
 return nb
	
}
 function speciaux()
 {nb1=0
  nb2=0
  nb3=0
  for(i=0;i<=ch.length;i++)
	  {if(ch[i]>="A" && ch[i]<="Z")
		  nb1=nb1+1
		  
	  }
  else if{}
	 
 }
 