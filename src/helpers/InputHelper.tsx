import axios from "axios";
import { RefObject } from "react";

export  const InputHelper = {
    getValue: (ref:RefObject<HTMLInputElement>):string => {
       return ref.current.value
    }
}