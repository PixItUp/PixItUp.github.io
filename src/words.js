
var WordPOS = require('wordpos');
var wordpos = new WordPOS();
var sls=['A blessing in disguise','A dime a dozen','Beat around the bush','Better late than never','Bite the bullet','Break a leg','Call it a day','Cut somebody some slack','Cutting corners','Get out of hand','Get something out of your system','Get your act together','Give someone the benefit of the doubt','Go back to the drawing board','Hang in there','Hit the sack','Its not rocket science','Let someone off the hook','Make a long story short','Miss the boat','No pain, no gain','On the ball','Pull someones leg','Pull yourself together','So far so good','Speak of the devil','Thats the last straw','The best of both worlds','Time flies when youre having fun','To get bent out of shape','To make matters worse','Under the weather','Well cross that bridge when we come to it','Wrap your head around something','You can say that again','Your guess is as good as mine','A bird in the hand is worth two in the bush','A penny for your thoughts','A penny saved is a penny earned','A perfect storm','A picture is worth 1000 words','Actions speak louder than words','Add insult to injury','Barking up the wrong tree','Birds of a feather flock together','Bite off more than you can chew','Break the ice','By the skin of your teeth','Comparing apples to oranges','Costs an arm and a leg','Do something at the drop of a hat','Do unto others as you would have them do unto you','Dont count your chickens before they hatch','Dont cry over spilt milk','Dont give up your day job','Dont put all your eggs in one basket','Every cloud has a silver lining','Get a taste of your own medicine','Give someone the cold shoulder','Go on a wild goose chase','Good things come to those who wait','He has bigger fish to fry','Hes a chip off the old block','Hit the nail on the head','Ignorance is bliss','It aint over till the fat lady sings','It takes one to know one','Its a piece of cake','Kill two birds with one stone','Let the cat out of the bag','Look before you leap','On thin ice','Once in a blue moon','Play devils advocate','Put something on ice','Rain on someones parade','Saving for a rainy day','Slow and steady wins the race','Spill the beans','Take a rain check','Take it with a grain of salt','The ball is in your court','The best thing since sliced bread','The devil is in the details','The early bird gets the worm','The elephant in the room','The whole nine yards','There are other fish in the sea','Theres a method to his madness','Theres no such thing as a free lunch','Throw caution to the wind','You cant have your cake and eat it too','You cant judge a book by its cover','A little learning is a dangerous thing','A snowball effect','A snowballs chance in hell','A stitch in time saves nine','A storm in a teacup','An apple a day keeps the doctor away','An ounce of prevention is worth a pound of cure','As right as rain','Bolt from the blue','Burn bridges','Calm before the storm','Come rain or shine','Curiosity killed the cat','Cut the mustard','Dont beat a dead horse','Every dog has his day','Familiarity breeds contempt','Fit as a fiddle','Fortune favours the bold','Get a second wind','Get wind of something','Go down in flames','Haste makes waste','Have your head in the clouds','He who laughs last laughs loudest','Hear something straight from the horses mouth','Hes not playing with a full deck','Hes off his rocker','Hes sitting on the fence','It is a poor workman who blames his tools','It is always darkest before the dawn','It takes two to tango','Jump on the bandwagon','Know which way the wind is blowing','Leave no stone unturned','Let sleeping dogs lie','Like riding a bicycle','Like two peas in a pod','Make hay while the sun shines','On cloud nine','Once bitten, twice shy','Out of the frying pan and into the fire','Run like the wind','Shape up or ship out','That ship has sailed','The pot calling the kettle black','There are clouds on the horizon','Those who live in glass houses shouldnt throw stones','Through thick and thin','Time is money','Waste not, want not','We see eye to eye','Weather the storm','Well begun is half done','You can catch more flies with honey than you can with vinegar','You can lead a horse to water, but you cant make him drink','You cant make an omelet without breaking some eggs']

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min )) + min;
}
function decid(dat,lo,strs,cha,xs,n){
  //wordpos.seek(dat.synsetOffset,'n').then(console.log)

  return wordpos.seek(dat,'n').then (function(data){
      // console.log(data.ptrs)
    var ls= []
    for (var q =0 ;q<data.ptrs.length;q++){
      var vass=data.ptrs[q].pointerSymbol
      if(vass=='!'||vass=='~'){
        ls.push(data.ptrs[q])
      }
    }
    if(ls.length==0){
      ls=data.ptrs
    }
    var loc= getRandomInt(0,ls.length)
    // console.log(loc)
    // console.log(data.ptrs)
    return wordpos.seek(ls[loc].synsetOffset,ls[loc].pos).then(function(z){
      // var as=z.synonyms[getRandomInt(0,z.synonyms.length)]
      var as=z.lemma
          //  console.log(vars[w],vol[w])
          xs.push((strs.replace(cha,as).replace("_"," ")))
          if(n>1 ){
            return dostuff(n-1,xs)
          }else{
            return xs;
          }


      //  console.log( strs.replace(cha,as))

    } )
  })
  // console.log(ar)
}
function dostuff(numstuff,arr){


var s=sls[getRandomInt(0,sls.length)]

return wordpos.getNouns(s).then(function(b){
   var po=getRandomInt(0,b.length)
  //var po=0
  var cha=b[po]

  // console.log(cha)
  return wordpos.lookupNoun(cha).then( function(a){
    var lo=getRandomInt(0,a.length)
    // console.log(a)
    // console.log(vo)
    return decid(a[lo].synsetOffset,lo,s,cha,arr,numstuff)
    //  console.log(arr)
    // console.log(s.replace(cha,xs) )
    //console.log(a)
  })
})}

export function dothis(num){
  var xs=[]
  return dostuff(num,xs)
}
