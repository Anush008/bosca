/*
 * Copyright 2024 Sowers, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Attributes, EndIdFactoryFilter, UsxContext, UsxItem, UsxItemFactory } from './item'
import { Position } from './position'

export class ChapterEnd implements UsxItem {

  readonly eid: string
  readonly position: Position

  readonly verse: string | null

  constructor(context: UsxContext, attributes: Attributes) {
    this.eid = attributes.EID.toString()
    this.verse = context.addVerseItem(this)
    this.position = context.position
  }
}

export class ChapterEndFactory extends UsxItemFactory<ChapterEnd> {

  static readonly instance = new ChapterEndFactory()

  constructor() {
    super('chapter', new EndIdFactoryFilter())
  }

  protected onInitialize() {
  }

  create(context: UsxContext, attributes: Attributes): ChapterEnd {
    return new ChapterEnd(context, attributes)
  }
}