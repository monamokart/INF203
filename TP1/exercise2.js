"use strict"

function wc (string_text){
    let words = string_text.split(" ");
    let output={};
    let len = words.length;
    for (let i=0; i<len; i++){
        output[words[i]]=0;
    }
    for (let i=0; i<len; i++){
        output[words[i]]++;
    }
return output;
}




function WList(string_text){
    this.text = string_text;
    this.maxCountWord = function maxCountWord() { 
        let counts = wc(this.text);
        let max = 0;
        let max_word =[];
        let len  = Object.keys(counts).length;
         
        for (let i=0; i<len;i++){
            if (counts[Object.keys(counts)[i]]==max){
               max_word.push(Object.keys(counts)[i]);
            }

            if (counts[Object.keys(counts)[i]]>max){
                max_word = [Object.keys(counts)[i]];
                max = counts[Object.keys(counts)[i]];
            }
            
        }
    
         
        for (let j=0; j< this.getWords().length;j++){
            for (let k=0; k<max_word.length;k++){
                if(this.getWords()[j] == max_word[k]){
                    return this.getWords()[j];
                }
            }
        }
    }
    
    this.minCountWord =function  minCountWord(){
        let counts = wc(this.text);
        let min = counts[Object.keys(counts)[0]];
        let len  = Object.keys(counts).length;
        let min_word =[];
        for (let i=0; i<len;i++){
            if (counts[Object.keys(counts)[i]]==min){
                min_word.push(Object.keys(counts)[i]);
            }
            
            if (counts[Object.keys(counts)[i]]<min){
                min_word = [Object.keys(counts)[i]]; 
                min = counts[Object.keys(counts)[i]];
            }
        }
        for (let j=0; j< this.getWords().length;j++){
            for (let k=0; k<min_word.length;k++){
               if(this.getWords()[j] == min_word[k]){
                    return this.getWords()[j];
               }
            }
        }
    }

    this.getWords = function getWords(){
        let counts = wc(this.text);
        let no_duplicate = Object.keys(counts);
        no_duplicate.sort();
        return no_duplicate;
    }

    this.getCount = function getCount(word){
        let counts = wc(this.text);
        if (word in counts){
            return(counts[word]);
        }

        else{
            return("Ce mot n'est pas dans l'object");
        }
    }

    this.applyWordFunc = function applyWordFunc (f){
        let words = this.getWords()
        return words.map(f)
    }
}


exports.wc = wc;
exports.WList = WList;