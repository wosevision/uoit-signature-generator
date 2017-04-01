import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
/**
 * Remove an __@__ symbol from a string if the expression is true.
 *
 * If the expression assigned to `isTwitter` evaluates to a truthy value
 * then the templated elements are removed removed from the DOM, and
 * switched out for one with an __@__ and vice versa.
 *
 * ```
 * <span *isTwitter="network.type.twitter">
 *   wosevision
 * </span>
 * 
 * // becomes...
 * <span>@wosevision</span>
 *
 * ### Syntax
 *
 * - `<div *myUnless="condition">...</div>`
 * - `<div template="myUnless condition">...</div>`
 * - `<template [myUnless]="condition"><div>...</div></template>`
 *
 */
@Directive({ selector: '[myUnless]'})
export class TwitterDirective {
  hasView = false;
  constructor(
  	templateRef: TemplateRef,
  	viewContainer: ViewContainerRef
  ) { }
  @Input() set isTwitter(condition) {
    if (!condition && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (condition && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
