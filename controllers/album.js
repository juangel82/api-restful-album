'use strict'

var Album = require('../models/album');


function getAlbum(req,res){
  var albumId = req.params.id;

  Album.findById(albumId,(err,album) =>{
    if (err){
      res.status(500).send({message:'Error en la peticion'});

    }else
      {
        if(!album){
          res.status(404).send({message:'Album no existe'});
        }else{
          res.status(200).send({album});
        }

      }
  });
}

function getAlbums(req,res){
  var albumId = req.params.id;

  Album.find({},(err,albums) =>{
    if (err){
      res.status(500).send({message:'Error en la peticion'});

    }else
      {
        if(!albums){
          res.status(404).send({message:'Albums no existe'});
        }else{
          res.status(200).send({albums});
        }

      }
  });


}

function  saveAlbum(req,res){
  var album = new Album();
  var params = req.body;
  album.title = params.title;
  album.description = params.description;

  album.save((err,albumStored)=>{
    if(err){
      res.status(500).send({message:'Error al guardar'});
    }else{
      if(!albumStored){
        res.status(404).send({message:'no hay album'});
      }else{
        res.status(200).send({album:albumStored});
      }
    }
  });

}

function updateAlbum(req,res){
  var albumId = req.params.id;
  var update = req.body;

    Album.findByIdAndUpdate(albumId,update,(err,albumUpdated)=>{
    if(err){
      res.status(500).send({message:'Error al actualizar'});
    }else{
      if(!albumUpdated){
        res.status(404).send({message:'no hay album'});
      }else{
        res.status(200).send({album:albumUpdated});
      }
    }
  });

}

function deleteAlbum(req,res){
  var albumId = req.params.id;

    Album.findByIdAndRemove(albumId,(err,albumRemoved)=>{
    if(err){
      res.status(500).send({message:'Error al eliminar'});
    }else{
      if(!albumRemoved){
        res.status(404).send({message:'no hay album'});
      }else{
        res.status(200).send({album:albumRemoved});
      }
    }
  });

}
module.exports = {
  getAlbum,
  getAlbums,
  saveAlbum,
  updateAlbum,
  deleteAlbum


}
