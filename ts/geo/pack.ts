import {Matrix} from '../scimath/matrix'//class
import {Shape,Pair,Dot,Vector} from './geomath'//fundamental shapes
import {dotProduct,dis,dis_sqr,len,opr} from './geomath'//methods
import {Line, Segment,Capsule,Circle} from './shapes'//additional shapes

export {Matrix}
export {Shape,Pair,Dot,Vector}
export {Line, Segment,Capsule,Circle}

type flex = number | Dot

type flexout = Dot | Circle | Segment
type out = Dot & Circle & Segment

type candy = (a : flex, b : flex) => flexout

let helper : candy = (a : flex, b : flex) => {
    if(typeof b == 'number'){
        if(typeof a == 'number'){
            return new Dot(a,b)
        }else{
            return new Circle(a,b)
        }
    }else{
        if(a instanceof Dot ){
            return new Segment(a,b)
        }else{
            throw 'helper function _() cannot call upon (a : number, b: Dot)'
        }
    }
}

export let _ = (a:flex,b:flex) => <out>(helper(a,b))