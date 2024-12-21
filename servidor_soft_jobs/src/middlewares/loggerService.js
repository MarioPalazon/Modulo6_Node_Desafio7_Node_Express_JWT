
const loggerService=(req,res,next)=>{

        const sendResponse = res.send; // Guarda el método original `res.send`
        const inicio = Date.now();
      
        const method=req.method;
        let request=""
        if(method==="POST"){
          request=req.body
        }else{
          request=req.params;
        }

        res.send = function (body) {
          const duracion = Date.now() - inicio;
          const log = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} duracion: ${duracion}ms  request: ${JSON.stringify(request)} response: ${body}\n`;
              
          console.log(log);
          
          return sendResponse.call(this, body); // Llamar al método original `res.send`
        };
      
        next();
      };
    

module.exports=loggerService
