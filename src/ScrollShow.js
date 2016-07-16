import throttle from 'lodash/throttle';

/**
 *
 */
export class ScrollShow {

  /**
   * Create a new ScrollShow instance
   * @param options {Object} Settings to use
   * @param [options.enterOffset=100] {number} Extra pixels before an element is considered in view
   * @param [options.exitMargin=200] {number} Fewer pixels before an element is considered out of view
   * @param [options.query=null] {String} Query string targeting the elements you want to target
   * @param [options.throttle=250] {number} Milliseconds to throttle scroll action
   * @param [options.debug=false] {boolean} Enable rudimentary debugging feature
   * @param [options.fireOnce=false] {boolean} Set to true to disable further actions once elements have appeared once
   * @param [options.outOfViewClass='out-of-view'] {string} Class to add once elements are out of view
   * @param [options.inViewClass='in-view'] {string} Class to add once elements are in view
   */
  constructor(options) {
    const defaults = {
      enterOffset: 100,
      exitMargin: 200,
      query: null,
      throttle: 250,
      debug: false,
      fireOnce: false,
      outOfViewClass: 'out-of-view',
      inViewClass: 'in-view'
    };

    // Merge defaults with provided values
    const populated = Object.assign(defaults, options);
    for (const key in populated) {
      if (populated.hasOwnProperty(key)) {
        this[key] = populated[key];
      }

      this.options = populated;
      this.scrollElements = document.querySelectorAll(populated.query);

      // Throttle for performance
      window.addEventListener('scroll', throttle(this.checkScroll, this.options.throttle));
    }

    this.checkScroll();
  }

  /**
   *
   */
  checkScroll = () => {
    if (this.options.debug) console.log('Checking scroll');
    var windowHeight = window.innerHeight - this.options.enterOffset;
    var windowTop = window.scrollY + this.options.exitMargin;
    var windowBottom = window.scrollY + windowHeight;

    for (var scrollElement of this.scrollElements) {
      var elementHeight = scrollElement.offsetHeight;
      var elementTop = scrollElement.offsetTop;
      var elementBottom = (elementTop + elementHeight);

      //check to see if this current container is within viewport
      if ((elementBottom >= windowTop ) &&
        (elementTop <= windowBottom)) {
        scrollElement.classList.add(this.options.inViewClass);
        scrollElement.classList.remove(this.options.outOfViewClass)


      } else if (this.options.fireOnce == false) {
        scrollElement.classList.add(this.options.outOfViewClass);
        scrollElement.classList.remove(this.options.inViewClass);

      }
    }
  }

};
