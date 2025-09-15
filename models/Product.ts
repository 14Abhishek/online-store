import mongoose, {Schema, model, models} from "mongoose"

export const IMAGE_VARIANTS = {
    SQUARE: {
        type:"SQUARE",
        dimension:{width:1200,  height:1200},
        label:"Square (1:1)",
        aspectRatio:"1:1",
    },
    WIDE:{
        type:"WIDE",
        dimensions:{width:1920, height:1080},
        label: "Widescreen (16:9)",
        aspectRatio:"16:9",
    },
    PORTRAIT:{
        type: "PORTRAIT",
        dimensions:{width:1080, height:1440},
        label:"Portrai (3:4)",
        aspectRatio: "3:4",
    }
} as const;
// so --as const-- tells typescript that "don't you change the type:PORTRAIT to type: string like you always do " so typescript would treat 'type' these things(portrait,wide,square) to the exact literal values

export type ImageVariantType= keyof typeof IMAGE_VARIANTS;

export interface ImageVariant{
    type: ImageVariantType;
    price:number;
    license: "personal" | "commercial";
}

export interface IProduct {
    _id?: mongoose.Types.ObjectId;
    name:string;
    description:string;
    imageUrl: string;
    variants:ImageVariant[];
}

const imageVariantSchema = new Schema<ImageVariant>({
   type:{
    type: String,
    required:true,
    enum : ["SQUARE", "WIDE", "POTRAIT"]
   },
   price:{
    type: Number,
    required:true,
    min:0
   },
   license:{
    type:String,
    required:true,
    enum:["personal", "commercial"]
   }
    
})

const productSchema = new Schema<IProduct>({
    name:{
        type:String,
        required:true,
    },
    description:{
        required:true,
        type:String
    },
    imageUrl:{
        type:String,
        required:true
    },
    variants:[imageVariantSchema]
},{timestamps:true})



const Product = models?.Product ||  model<IProduct>("Product", productSchema)

export default Product;