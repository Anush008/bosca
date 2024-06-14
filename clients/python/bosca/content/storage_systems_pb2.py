# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: bosca/content/storage_systems.proto
# Protobuf Python Version: 5.26.1
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
from google.protobuf.internal import builder as _builder
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


from bosca.content import model_pb2 as bosca_dot_content_dot_model__pb2


DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n#bosca/content/storage_systems.proto\x12\rbosca.content\x1a\x19\x62osca/content/model.proto\"\xec\x01\n\rStorageSystem\x12\n\n\x02id\x18\x01 \x01(\t\x12.\n\x04type\x18\x02 \x01(\x0e\x32 .bosca.content.StorageSystemType\x12\x0c\n\x04name\x18\x03 \x01(\t\x12\x13\n\x0b\x64\x65scription\x18\x04 \x01(\t\x12\x46\n\rconfiguration\x18\x05 \x03(\x0b\x32/.bosca.content.StorageSystem.ConfigurationEntry\x1a\x34\n\x12\x43onfigurationEntry\x12\x0b\n\x03key\x18\x01 \x01(\t\x12\r\n\x05value\x18\x02 \x01(\t:\x02\x38\x01\"?\n\x0eStorageSystems\x12-\n\x07systems\x18\x01 \x03(\x0b\x32\x1c.bosca.content.StorageSystem\"G\n\x12StorageSystemModel\x12#\n\x05model\x18\x02 \x01(\x0b\x32\x14.bosca.content.Model\x12\x0c\n\x04type\x18\x03 \x01(\t\"H\n\x13StorageSystemModels\x12\x31\n\x06models\x18\x01 \x03(\x0b\x32!.bosca.content.StorageSystemModel*\xa4\x01\n\x11StorageSystemType\x12\x1a\n\x16unknown_storage_system\x10\x00\x12\x19\n\x15vector_storage_system\x10\x01\x12\x19\n\x15search_storage_system\x10\x02\x12\x1b\n\x17metadata_storage_system\x10\x03\x12 \n\x1csupplementary_storage_system\x10\x04\x42%Z#bosca.io/api/protobuf/bosca/contentb\x06proto3')

_globals = globals()
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, _globals)
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'bosca.content.storage_systems_pb2', _globals)
if not _descriptor._USE_C_DESCRIPTORS:
  _globals['DESCRIPTOR']._loaded_options = None
  _globals['DESCRIPTOR']._serialized_options = b'Z#bosca.io/api/protobuf/bosca/content'
  _globals['_STORAGESYSTEM_CONFIGURATIONENTRY']._loaded_options = None
  _globals['_STORAGESYSTEM_CONFIGURATIONENTRY']._serialized_options = b'8\001'
  _globals['_STORAGESYSTEMTYPE']._serialized_start=533
  _globals['_STORAGESYSTEMTYPE']._serialized_end=697
  _globals['_STORAGESYSTEM']._serialized_start=82
  _globals['_STORAGESYSTEM']._serialized_end=318
  _globals['_STORAGESYSTEM_CONFIGURATIONENTRY']._serialized_start=266
  _globals['_STORAGESYSTEM_CONFIGURATIONENTRY']._serialized_end=318
  _globals['_STORAGESYSTEMS']._serialized_start=320
  _globals['_STORAGESYSTEMS']._serialized_end=383
  _globals['_STORAGESYSTEMMODEL']._serialized_start=385
  _globals['_STORAGESYSTEMMODEL']._serialized_end=456
  _globals['_STORAGESYSTEMMODELS']._serialized_start=458
  _globals['_STORAGESYSTEMMODELS']._serialized_end=530
# @@protoc_insertion_point(module_scope)
