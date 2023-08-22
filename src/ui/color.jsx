
export const Colors = (color) =>{
    if(color !== '#101B36'){
        return{
            color:'#101B36',
            smallText:'#5F719F',
            borderColor:'#FFFFFF',
            blockBackground:'#ECF3FB',
            premium:'#3DD5F3',
            menu:'#FFFFFF',
            premiumMenu:'#3DD5F3',
            itemColor:'#FFFFFF',
            activeItemColor:'#3DD5F3',
            Instruction:'#C2C9CF',
            adText:'#5F719F',
        }
    }
    else {
        return {
            color:'#FFFFFF',
            smallText:'#FFFFFF',
            borderColor:'#0C1630',
            blockBackground:'#0C1630',
            premium:'#0C1630',
            menu:'#101B36',
            premiumMenu:'#101B36',
            itemColor:'#5F719F',
            activeItemColor:'#FFFFFF',
            Instruction:'#101B36',
            adText:'#FFFFFF',
        }
    }
}