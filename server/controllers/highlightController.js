import {addHighlightService,getHighlightService} from "../services/highlightService.js";

export const addHighlight = async(req,res)=>{

const data = await addHighlightService(req.body,req.user.id);

res.json(data);

};

export const getHighlights = async(req,res)=>{

const data = await getHighlightService(req.user.id);

res.json(data);

};