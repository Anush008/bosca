# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: bosca/content/items.proto
# Protobuf Python Version: 5.26.1
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
from google.protobuf.internal import builder as _builder
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


from google.protobuf import timestamp_pb2 as google_dot_protobuf_dot_timestamp__pb2


DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x19\x62osca/content/items.proto\x12\rbosca.content\x1a\x1fgoogle/protobuf/timestamp.proto\"\x8b\x02\n\x04Item\x12\n\n\x02id\x18\x02 \x01(\t\x12\x0c\n\x04name\x18\x03 \x01(\t\x12\x14\n\x0c\x63\x61tegory_ids\x18\x0c \x03(\t\x12\x0c\n\x04tags\x18\r \x03(\t\x12\x37\n\nattributes\x18\x0e \x03(\x0b\x32#.bosca.content.Item.AttributesEntry\x12+\n\x07\x63reated\x18\x14 \x01(\x0b\x32\x1a.google.protobuf.Timestamp\x12,\n\x08modified\x18\x15 \x01(\x0b\x32\x1a.google.protobuf.Timestamp\x1a\x31\n\x0f\x41ttributesEntry\x12\x0b\n\x03key\x18\x01 \x01(\t\x12\r\n\x05value\x18\x02 \x01(\t:\x02\x38\x01*K\n\x08ItemType\x12\x0b\n\x07unknown\x10\x00\x12\x0e\n\ncollection\x10\x01\x12\x0c\n\x08metadata\x10\x02\x12\x14\n\x10metadata_variant\x10\x03\x42%Z#bosca.io/api/protobuf/bosca/contentb\x06proto3')

_globals = globals()
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, _globals)
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'bosca.content.items_pb2', _globals)
if not _descriptor._USE_C_DESCRIPTORS:
  _globals['DESCRIPTOR']._loaded_options = None
  _globals['DESCRIPTOR']._serialized_options = b'Z#bosca.io/api/protobuf/bosca/content'
  _globals['_ITEM_ATTRIBUTESENTRY']._loaded_options = None
  _globals['_ITEM_ATTRIBUTESENTRY']._serialized_options = b'8\001'
  _globals['_ITEMTYPE']._serialized_start=347
  _globals['_ITEMTYPE']._serialized_end=422
  _globals['_ITEM']._serialized_start=78
  _globals['_ITEM']._serialized_end=345
  _globals['_ITEM_ATTRIBUTESENTRY']._serialized_start=296
  _globals['_ITEM_ATTRIBUTESENTRY']._serialized_end=345
# @@protoc_insertion_point(module_scope)
