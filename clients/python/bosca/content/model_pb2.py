# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: bosca/content/model.proto
# Protobuf Python Version: 5.26.1
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
from google.protobuf.internal import builder as _builder
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x19\x62osca/content/model.proto\x12\rbosca.content\"\xba\x01\n\x05Model\x12\n\n\x02id\x18\x01 \x01(\t\x12\x0c\n\x04type\x18\x02 \x01(\t\x12\x0c\n\x04name\x18\x03 \x01(\t\x12\x13\n\x0b\x64\x65scription\x18\x04 \x01(\t\x12>\n\rconfiguration\x18\x05 \x03(\x0b\x32\'.bosca.content.Model.ConfigurationEntry\x1a\x34\n\x12\x43onfigurationEntry\x12\x0b\n\x03key\x18\x01 \x01(\t\x12\r\n\x05value\x18\x02 \x01(\t:\x02\x38\x01\".\n\x06Models\x12$\n\x06models\x18\x01 \x03(\x0b\x32\x14.bosca.content.ModelB%Z#bosca.io/api/protobuf/bosca/contentb\x06proto3')

_globals = globals()
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, _globals)
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'bosca.content.model_pb2', _globals)
if not _descriptor._USE_C_DESCRIPTORS:
  _globals['DESCRIPTOR']._loaded_options = None
  _globals['DESCRIPTOR']._serialized_options = b'Z#bosca.io/api/protobuf/bosca/content'
  _globals['_MODEL_CONFIGURATIONENTRY']._loaded_options = None
  _globals['_MODEL_CONFIGURATIONENTRY']._serialized_options = b'8\001'
  _globals['_MODEL']._serialized_start=45
  _globals['_MODEL']._serialized_end=231
  _globals['_MODEL_CONFIGURATIONENTRY']._serialized_start=179
  _globals['_MODEL_CONFIGURATIONENTRY']._serialized_end=231
  _globals['_MODELS']._serialized_start=233
  _globals['_MODELS']._serialized_end=279
# @@protoc_insertion_point(module_scope)
