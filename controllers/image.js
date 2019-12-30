'use strict'
var path = require('path');
var Image = require('../models/image');
var Album = require('../models/album');

function pruebas(req,res){
  res.status(200).send({message:'ok pruebas'});


}

function getImage(req,res){
  var imageId = req.params.id;

  Image.findById(imageId,(err,image)=>{
    if(err){
      res.status(500).send({message:'error en peticion'});
    }else{
      if(!image){
        res.status(404).send({message:'no existe la imagen'});
      }else{
        Album.populate(image,{path:'album'},(err,image)=>{
          if(err){
          res.status(500).send({message:'error en peticion'});
          }else{
            res.status(200).send({image});
          }

        });

      }
    }

  });

}

function saveImage(req,res){
  var image = new Image();
  var params = req.body;
  image.title = params.title;
  image.picture = null;
  image.album = params.album;

  image.save((err,imageStored)=>{
    if(err){
      res.status(500).send({message:'error en peticion'});
    }else{
      if(!imageStored){
        res.status(404).send({message:'no se ha guardado'});
      }else{
        res.status(200).send({image:imageStored});
      }
    }

  });
}

function updateImage(req,res){
  var imageId = req.params.id;
  var update = req.body;
  Image.findByIdAndUpdate(imageId,update,(err,imageUpdated)=>{
    if(err){
      res.status(500).send({message:'error en peticion'});
    }else{
      if(!imageUpdated){
        res.status(404).send({message:'no se ha guardado'});
      }else{
        res.status(200).send({image:imageUpdated});
      }
    }
  });

}


function getImages(req,res){
  var albumId = req.params.album;

  if(!albumId){
     //sacar todas las imagenes de bbdd
    Image.find({}).sort('title').exec((err,images) =>{
      if(err){
         res.status(500).send({message:'error en peticion'});
      }else{
        if(!images){
           res.status(404).send({message:'no hay imagenes'});
        }else{
               Album.populate(images,{path:'album'},(err,images)=>{
          if(err){
          res.status(500).send({message:'error en peticion'});
          }else{
            res.status(200).send({images});
          }

        });
        }
      }
    } );

     }else{
     //sacar todas las imagenes de ese album
       Image.find({album:albumId}).sort('title').exec((err,images) =>{
      if(err){
         res.status(500).send({message:'error en peticion'});
      }else{
        if(!images){
           res.status(404).send({message:'no hay imagenes'});
        }else{

          Album.populate(images,{path:'album'},(err,images)=>{
          if(err){
          res.status(500).send({message:'error en peticion'});
          }else{
            res.status(200).send({images});
          }

        });
        }
      }
    } );
     }
}

function deleteImage(req,res){
  var imageId = req.params.id;
   Image.findByIdAndRemove(imageId,(err,imageRemoved)=>{
    if(err){
      res.status(500).send({message:'error en peticion'});
    }else{
      if(!imageRemoved){
        res.status(404).send({message:'no se ha guardado'});
      }else{
        res.status(200).send({image:imageRemoved});
      }
    }
  });
}

function uploadImage(req,res){
  var imageId = req.params.id;
  var file_name = 'No subido';

  if(req.files){
    var file_path = req.files.image.path;
    console.log('chumino:'+file_path);
    var file_split = file_path.split('/');
    var file_name = file_split[1];

    console.log(file_path);
    console.log(file_name);

    Image.findByIdAndUpdate(imageId,{picture:file_name},(err,imageUpdated)=>{
    if(err){
      res.status(500).send({message:'error en peticion'});
    }else{
      if(!imageUpdated){
        res.status(404).send({message:'no se ha guardado'});
      }else{
        res.status(200).send({image:imageUpdated});
      }
    }
  });

     }else{
       res.status(200).send({message:'no ha subido imagen'});
     }
}
var fs = require('fs');
function getImageFile(req,res){
  var imageFile = req.params.imageFile;

  fs.exists('./uploads/'+imageFile,function(exists){
    if (exists){
      res.sendFile(path.resolve('./uploads/'+imageFile));
    }else{
 res.status(200).send({message:'no existe la imagen '});
    }
  });
}

module.exports = {
  pruebas,
  getImage,
  saveImage,
  getImages,
  updateImage,
  deleteImage,
  uploadImage,
  getImageFile
}
