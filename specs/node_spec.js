require("./spec_helper")

describe("$dom", function(){
  describe("hasClass", function(){
    it("whithout the class", function(){
      var elm = document.createElement("div");

      var hasClassHelper = stik.labs.dom({
        name: "hasClass"
      }).run();

      expect(hasClassHelper(elm, "active")).toBeFalsy();
    });

    it("with the class", function(){
      var elm = document.createElement("div");
      elm.className = "active";

      var hasClassHelper = stik.labs.dom({
        name: "hasClass"
      }).run();

      expect(hasClassHelper(elm, "active")).toBeTruthy();
    });

    it("with a different class", function(){
      var elm = document.createElement("div");
      elm.className = "not-active";

      var hasClassHelper = stik.labs.dom({
        name: "hasClass"
      }).run();

      expect(hasClassHelper(elm, "active")).toBeFalsy();
    });
  });

  describe("addClass", function(){
    it("whithout the class", function(){
      var elm = document.createElement("div");

      var addClassHelper = stik.labs.dom({
        name: "addClass"
      }).run();

      addClassHelper(elm, "active");

      expect(elm.className).toEqual("active");
    });

    it("with the class", function(){
      var elm = document.createElement("div");
      elm.className = "active";

      var addClassHelper = stik.labs.dom({
        name: "addClass"
      }).run();

      addClassHelper(elm, "active");

      expect(elm.className).toEqual("active");
    });

    it("with a different class", function(){
      var elm = document.createElement("div");
      elm.className = "not-active";

      var addClassHelper = stik.labs.dom({
        name: "addClass"
      }).run();

      addClassHelper(elm, "active");

      expect(elm.className).toEqual("not-active active");
    });

    it("with multiple classes", function(){
      var elm = document.createElement("div");
      elm.className = "active";

      var addClass = stik.labs.dom({
        name: "addClass"
      }).run();

      addClass(elm, "should-be-active and-functional");

      expect(elm.className).toEqual("active should-be-active and-functional");
    });

    it("with an array of classes", function(){
      var elm = document.createElement("div");
      elm.className = "active";

      var addClass = stik.labs.dom({
        name: "addClass"
      }).run();

      addClass(elm, ["should-be-active", "and-functional"]);

      expect(elm.className).toEqual("active should-be-active and-functional");
    });
  });

  describe("removeClass", function(){
    it("whithout the class", function(){
      var elm = document.createElement("div");

      var removeClassHelper = stik.labs.dom({
        name: "removeClass"
      }).run();

      expect(function(){
        removeClassHelper(elm, "active");
      }).not.toThrow();
    });

    it("with the class", function(){
      var elm = document.createElement("div");
      elm.className = "active";

      var removeClassHelper = stik.labs.dom({
        name: "removeClass"
      }).run();

      removeClassHelper(elm, "active");

      expect(elm.className).toEqual("");
    });

    it("with a different class", function(){
      var elm = document.createElement("div");
      elm.className = "not-active";

      var removeClassHelper = stik.labs.dom({
        name: "removeClass"
      }).run();

      removeClassHelper(elm, "active");

      expect(elm.className).toEqual("not-active");
    });

    it("with a close enough class", function(){
      var elm = document.createElement("div");
      elm.className = "active-by-click active";

      var removeClassHelper = stik.labs.dom({
        name: "removeClass"
      }).run();

      removeClassHelper(elm, "active");

      expect(elm.className).toEqual("active-by-click");
    });

    it("with multiple classes", function(){
      var elm = document.createElement("div");
      elm.className = "should-be-active active and-functional";

      var removeClass = stik.labs.dom({
        name: "removeClass"
      }).run();

      removeClass(elm, "should-be-active and-functional");

      expect(elm.className).toEqual("active");
    });

    it("with an array of classes", function(){
      var elm = document.createElement("div");
      elm.className = "should-be-active and-functional active";

      var removeClass = stik.labs.dom({
        name: "removeClass"
      }).run();

      removeClass(elm, ["should-be-active", "and-functional"]);

      expect(elm.className).toEqual("active");
    });

    it("removing the middle class", function(){
      var elm = document.createElement("div");
      elm.className = "cc-number visa identified";

      var removeClass = stik.labs.dom({
        name: "removeClass"
      }).run();

      removeClass(elm, "visa");

      expect(elm.className).toEqual("cc-number identified");
    });
  });

  describe("toggleClass", function(){
    it("whithout the class", function(){
      var elm = document.createElement("div");

      var toggleClass = stik.labs.dom({
        name: "toggleClass"
      }).run();

      toggleClass(elm, "active");

      expect(elm.className).toEqual("active");
    });

    it("with the class", function(){
      var elm = document.createElement("div");
      elm.className = "active";

      var toggleClass = stik.labs.dom({
        name: "toggleClass"
      }).run();

      toggleClass(elm, "active");

      expect(elm.className).toEqual("");
    });

    it("with a different class", function(){
      var elm = document.createElement("div");
      elm.className = "not-active";

      var toggleClass = stik.labs.dom({
        name: "toggleClass"
      }).run();

      toggleClass(elm, "active");

      expect(elm.className).toEqual("not-active active");
    });

    it("forcing addition", function(){
      var elm = document.createElement("div");
      elm.className = "active";

      addClassMock = jasmine.createSpy("addClassMock");

      var toggleClass = stik.labs.dom({
        name: "toggleClass"
      }).run({
        addClass: addClassMock
      });

      toggleClass(elm, "active", true);

      expect(addClassMock).toHaveBeenCalledWith(elm, "active");
    });

    it("forcing removal", function(){
      var elm = document.createElement("div");
      elm.className = "active";

      removeClassMock = jasmine.createSpy("removeClassMock");

      var toggleClass = stik.labs.dom({
        name: "toggleClass"
      }).run({
        removeClass: removeClassMock
      });

      toggleClass(elm, "active", false);

      expect(removeClassMock).toHaveBeenCalledWith(elm, "active");
    });
  });

  describe("hide", function(){
    it("when visible", function(){
      var elm = document.createElement("div");

      var hideHelper = stik.labs.dom({
        name: "hide"
      }).run();

      hideHelper(elm);

      expect(elm.style.display).toEqual("none");
    });
  });

  describe("show", function(){
    it("when visible", function(){
      var elm = document.createElement("div");

      var showHelper = stik.labs.dom({
        name: "show"
      }).run();

      showHelper(elm);

      expect(elm.style.display).toEqual("block");
    });

    it("when hidden", function(){
      var elm = document.createElement("div");
      elm.style.display = "none";

      var showHelper = stik.labs.dom({
        name: "show"
      }).run();

      showHelper(elm);

      expect(elm.style.display).toEqual("block");
    });
  });

  describe("remove", function(){
    it("should remove a child from its parent", function(){
      var template = document.createElement("div");
      template.innerHTML = "<span></span>";

      var removeHelper = stik.labs.dom({
        name: "remove"
      }).run();

      removeHelper(template.firstChild);

      expect(template.childNodes.length).toEqual(0);
    });
  });

  describe("parse", function(){
    it("should parse a string as a node element", function(){
      var template = "<span></span>";

      var parse = stik.labs.dom({
        name: "parse"
      }).run();

      var parsedTemplate = parse(template);

      expect(parsedTemplate instanceof window.HTMLElement).toBeTruthy();
    });
  });

  describe("append", function(){
    it("with a non empty parent", function(){
      var template = document.createElement("div");
      template.innerHTML = "<span></span>";
      var newNode = document.createElement("div");

      var appendHelper = stik.labs.dom({
        name: "append"
      }).run();

      appendHelper(template, newNode);

      expect(template.childNodes.length).toEqual(2);
      expect(template.lastChild.nodeName).toEqual("DIV");
    });

    it("with an empty parent", function(){
      var template = document.createElement("div");
      var newNode = document.createElement("div");

      var appendHelper = stik.labs.dom({
        name: "append"
      }).run();

      appendHelper(template, newNode);

      expect(template.childNodes.length).toEqual(1);
      expect(template.firstChild.nodeName).toEqual("DIV");
    });

    it("with a string child", function(){
      var template = document.createElement("div");
      var newNode = "<span></span>";

      var appendHelper = stik.labs.dom({
        name: "append"
      }).run();

      appendHelper(template, newNode);

      expect(template.childNodes.length).toEqual(1);
      expect(template.firstChild.nodeName).toEqual("SPAN");
    });

    it("with multiple childs as string", function(){
      var template = document.createElement("div");
      var newNodes = "<span></span><br><a>";

      var appendHelper = stik.labs.dom({
        name: "append"
      }).run();

      appendHelper(template, newNodes);

      expect(template.childNodes.length).toEqual(3);
      expect(template.childNodes[0].nodeName).toEqual("SPAN");
      expect(template.childNodes[1].nodeName).toEqual("BR");
      expect(template.childNodes[2].nodeName).toEqual("A");
    });
  });

  describe("prepend", function(){
    it("with a non empty parent", function(){
      var template = document.createElement("div");
      template.innerHTML = "<span></span>";
      var newNode = document.createElement("div");

      var prependHelper = stik.labs.dom({
        name: "prepend"
      }).run();

      prependHelper(template, newNode);

      expect(template.childNodes.length).toEqual(2);
      expect(template.firstChild.nodeName).toEqual("DIV");
    });

    it("with an empty parent", function(){
      var template = document.createElement("div");
      var newNode = document.createElement("div");

      var prependHelper = stik.labs.dom({
        name: "prepend"
      }).run();

      prependHelper(template, newNode);

      expect(template.childNodes.length).toEqual(1);
      expect(template.firstChild.nodeName).toEqual("DIV");
    });

    it("with a string child", function(){
      var template = document.createElement("div");
      var newNode = "<span></span>";

      var appendHelper = stik.labs.dom({
        name: "prepend"
      }).run();

      appendHelper(template, newNode);

      expect(template.childNodes.length).toEqual(1);
      expect(template.firstChild.nodeName).toEqual("SPAN");
    });

    it("with multiple childs as string", function(){
      var template = document.createElement("div");
      var newNodes = "<span></span><br><a>";

      var appendHelper = stik.labs.dom({
        name: "prepend"
      }).run();

      appendHelper(template, newNodes);

      expect(template.childNodes.length).toEqual(3);
      expect(template.childNodes[0].nodeName).toEqual("SPAN");
      expect(template.childNodes[1].nodeName).toEqual("BR");
      expect(template.childNodes[2].nodeName).toEqual("A");
    });
  });

  describe("insertAfter", function(){
    it("with a non empty parent", function(){
      var template = document.createElement("div");
      template.innerHTML = "<span></span><br>";
      var newNode = document.createElement("div");

      var insertAfterHelper = stik.labs.dom({
        name: "insertAfter"
      }).run();

      insertAfterHelper(template.firstChild, newNode);

      expect(template.childNodes.length).toEqual(3);
      expect(template.childNodes[1].nodeName).toEqual("DIV");
    });

    it("with a string child", function(){
      var template = document.createElement("div");
      template.innerHTML = "<span></span><br>";
      var newNode = "<div>/div>";

      var insertAfterHelper = stik.labs.dom({
        name: "insertAfter"
      }).run();

      insertAfterHelper(template.firstChild, newNode);

      expect(template.childNodes.length).toEqual(3);
      expect(template.childNodes[1].nodeName).toEqual("DIV");
    });
  });

  describe("insertBefore", function(){
    it("with a non empty parent", function(){
      var template = document.createElement("div");
      template.innerHTML = "<span></span><br>";
      var newNode = document.createElement("div");

      var insertBeforeHelper = stik.labs.dom({
        name: "insertBefore"
      }).run();

      insertBeforeHelper(template.firstChild, newNode);

      expect(template.childNodes.length).toEqual(3);
      expect(template.firstChild.nodeName).toEqual("DIV");
    });

    it("with a string child", function(){
      var template = document.createElement("div");
      template.innerHTML = "<span></span><br>";
      var newNode = "<div></div>";

      var insertBeforeHelper = stik.labs.dom({
        name: "insertBefore"
      }).run();

      insertBeforeHelper(template.firstChild, newNode);

      expect(template.childNodes.length).toEqual(3);
      expect(template.firstChild.nodeName).toEqual("DIV");
    });
  });

  describe("data", function(){
    it("should retrieve one attribute from the template", function(){
      var template = document.createElement("div"),
          result, dataHelper;

      template.setAttribute("data-id", "$081209j09urr123");

      dataHelper = stik.labs.dom({
        name: "data"
      }).run();

      result = dataHelper(template);

      expect(result).toEqual( { id: "$081209j09urr123" } );
    });

    it("should retrieve multiple attributes from the template", function(){
      var template = document.createElement("div"),
          result, dataHelper;

      template.setAttribute("data-id", "$081209j09urr123");
      template.setAttribute("data-active", "false");
      template.setAttribute("data-relative", "$0129740y4u2i2");

      dataHelper = stik.labs.dom({
        name: "data"
      }).run();

      result = dataHelper(template);

      expect(result).toEqual({
        id: "$081209j09urr123",
        active: "false",
        relative: "$0129740y4u2i2"
      });
    });

    it("should handle an attribute with multiple dashes", function(){
      var template = document.createElement("div"),
          result, dataHelper;

      template.setAttribute("data-db-id", "$081209j09urr123");
      template.setAttribute("data-is-more-active", "true");

      dataHelper = stik.labs.dom({
        name: "data"
      }).run();

      result = dataHelper(template);

      expect(result).toEqual({
        "dbId": "$081209j09urr123",
        "isMoreActive": "true"
      });
    });

    it("should also be accesible as a boundary", function(){
      var template = "",
          dom = { data: jasmine.createSpy("$dom") };

      var dataHelper = stik.labs.boundary({
        name: "$data"
      }).run({
        $template: template,
        $dom: dom
      });

      expect(dom.data).toHaveBeenCalledWith(template);
    });
  });

  describe("find", function(){
    it("a child element", function(){
      var template = document.createElement("div");
      template.innerHTML = "<span class=\"child\"></span>";

      var find = stik.labs.dom({
        name: "find"
      }).run();

      expect(find(template, ".child").nodeName).toEqual("SPAN");
    });
  });

  describe("findAll", function(){
    it("all specified child elements", function(){
      var template = document.createElement("div");
      template.innerHTML = "<span class=\"child\"></span><input class=\"name\"/><br>";

      var findAll = stik.labs.dom({
        name: "findAll"
      }).run();

      var result = findAll(template, ".child, .name");

      expect(result.length).toEqual(2);
      expect(result[0].nodeName).toEqual("SPAN");
      expect(result[1].nodeName).toEqual("INPUT");
    });
  });

  describe("event", function(){
    it("should delegate to addEventListener", function(){
      var template = jasmine.createSpyObj("template", ["addEventListener"]);

      var event = stik.labs.dom({
        name: "event"
      }).run();

      event(template, "click", function(){});

      expect(
        template.addEventListener
      ).toHaveBeenCalledWith("click", jasmine.any(Function), false);
    });
  });

  describe("click", function(){
    it("should create a listener", function(){
      var template = jasmine.createSpyObj("template", ["addEventListener"]);

      var click = stik.labs.dom({
        name: "click"
      }).run();

      click(template, function(){});

      expect(
        template.addEventListener
      ).toHaveBeenCalledWith("click", jasmine.any(Function), false);
    });
  });

  describe("doubleClick", function(){
    it("should create a listener", function(){
      var template = jasmine.createSpyObj("template", ["addEventListener"]);

      var doubleClick = stik.labs.dom({
        name: "doubleClick"
      }).run();

      doubleClick(template, function(){});

      expect(
        template.addEventListener
      ).toHaveBeenCalledWith("dblclick", jasmine.any(Function), false);
    });
  });

  describe("mouseDown", function(){
    it("should create a listener", function(){
      var template = jasmine.createSpyObj("template", ["addEventListener"]);

      var mouseDown = stik.labs.dom({
        name: "mouseDown"
      }).run();

      mouseDown(template, function(){});

      expect(
        template.addEventListener
      ).toHaveBeenCalledWith("mousedown", jasmine.any(Function), false);
    });
  });

  describe("mouseUp", function(){
    it("should create a listener", function(){
      var template = jasmine.createSpyObj("template", ["addEventListener"]);

      var mouseUp = stik.labs.dom({
        name: "mouseUp"
      }).run();

      mouseUp(template, function(){});

      expect(
        template.addEventListener
      ).toHaveBeenCalledWith("mouseup", jasmine.any(Function), false);
    });
  });

  describe("mouseMove", function(){
    it("should create a listener", function(){
      var template = jasmine.createSpyObj("template", ["addEventListener"]);

      var mouseMove = stik.labs.dom({
        name: "mouseMove"
      }).run();

      mouseMove(template, function(){});

      expect(
        template.addEventListener
      ).toHaveBeenCalledWith("mousemove", jasmine.any(Function), false);
    });
  });

  describe("mouseOver", function(){
    it("should create a listener", function(){
      var template = jasmine.createSpyObj("template", ["addEventListener"]);

      var mouseOver = stik.labs.dom({
        name: "mouseOver"
      }).run();

      mouseOver(template, function(){});

      expect(
        template.addEventListener
      ).toHaveBeenCalledWith("mouseover", jasmine.any(Function), false);
    });
  });

  describe("mouseOut", function(){
    it("should create a listener", function(){
      var template = jasmine.createSpyObj("template", ["addEventListener"]);

      var mouseOut = stik.labs.dom({
        name: "mouseOut"
      }).run();

      mouseOut(template, function(){});

      expect(
        template.addEventListener
      ).toHaveBeenCalledWith("mouseout", jasmine.any(Function), false);
    });
  });

  describe("abort", function(){
    it("should create a listener", function(){
      var template = jasmine.createSpyObj("template", ["addEventListener"]);

      var abort = stik.labs.dom({
        name: "abort"
      }).run();

      abort(template, function(){});

      expect(
        template.addEventListener
      ).toHaveBeenCalledWith("abort", jasmine.any(Function), false);
    });
  });

  describe("blur", function(){
    it("should create a listener", function(){
      var template = jasmine.createSpyObj("template", ["addEventListener"]);

      var blur = stik.labs.dom({
        name: "blur"
      }).run();

      blur(template, function(){});

      expect(
        template.addEventListener
      ).toHaveBeenCalledWith("blur", jasmine.any(Function), false);
    });
  });

  describe("change", function(){
    it("should create a listener", function(){
      var template = jasmine.createSpyObj("template", ["addEventListener"]);

      var change = stik.labs.dom({
        name: "change"
      }).run();

      change(template, function(){});

      expect(
        template.addEventListener
      ).toHaveBeenCalledWith("change", jasmine.any(Function), false);
    });
  });

  describe("error", function(){
    it("should create a listener", function(){
      var template = jasmine.createSpyObj("template", ["addEventListener"]);

      var error = stik.labs.dom({
        name: "error"
      }).run();

      error(template, function(){});

      expect(
        template.addEventListener
      ).toHaveBeenCalledWith("error", jasmine.any(Function), false);
    });
  });

  describe("focus", function(){
    it("should create a listener", function(){
      var template = jasmine.createSpyObj("template", ["addEventListener"]);

      var focus = stik.labs.dom({
        name: "focus"
      }).run();

      focus(template, function(){});

      expect(
        template.addEventListener
      ).toHaveBeenCalledWith("focus", jasmine.any(Function), false);
    });
  });

  describe("load", function(){
    it("should create a listener", function(){
      var template = jasmine.createSpyObj("template", ["addEventListener"]);

      var load = stik.labs.dom({
        name: "load"
      }).run();

      load(template, function(){});

      expect(
        template.addEventListener
      ).toHaveBeenCalledWith("load", jasmine.any(Function), false);
    });
  });

  describe("reset", function(){
    it("should create a listener", function(){
      var template = jasmine.createSpyObj("template", ["addEventListener"]);

      var reset = stik.labs.dom({
        name: "reset"
      }).run();

      reset(template, function(){});

      expect(
        template.addEventListener
      ).toHaveBeenCalledWith("reset", jasmine.any(Function), false);
    });
  });

  describe("resize", function(){
    it("should create a listener", function(){
      var template = jasmine.createSpyObj("template", ["addEventListener"]);

      var resize = stik.labs.dom({
        name: "resize"
      }).run();

      resize(template, function(){});

      expect(
        template.addEventListener
      ).toHaveBeenCalledWith("resize", jasmine.any(Function), false);
    });
  });

  describe("scroll", function(){
    it("should create a listener", function(){
      var template = jasmine.createSpyObj("template", ["addEventListener"]);

      var scroll = stik.labs.dom({
        name: "scroll"
      }).run();

      scroll(template, function(){});

      expect(
        template.addEventListener
      ).toHaveBeenCalledWith("scroll", jasmine.any(Function), false);
    });
  });

  describe("select", function(){
    it("should create a listener", function(){
      var template = jasmine.createSpyObj("template", ["addEventListener"]);

      var select = stik.labs.dom({
        name: "select"
      }).run();

      select(template, function(){});

      expect(
        template.addEventListener
      ).toHaveBeenCalledWith("select", jasmine.any(Function), false);
    });
  });

  describe("submit", function(){
    it("should create a listener", function(){
      var template = jasmine.createSpyObj("template", ["addEventListener"]);

      var submit = stik.labs.dom({
        name: "submit"
      }).run();

      submit(template, function(){});

      expect(
        template.addEventListener
      ).toHaveBeenCalledWith("submit", jasmine.any(Function), false);
    });
  });

  describe("unload", function(){
    it("should create a listener", function(){
      var template = jasmine.createSpyObj("template", ["addEventListener"]);

      var unload = stik.labs.dom({
        name: "unload"
      }).run();

      unload(template, function(){});

      expect(
        template.addEventListener
      ).toHaveBeenCalledWith("unload", jasmine.any(Function), false);
    });
  });

  describe("$elm", function(){
    it("should wrap the template as a stik-dom obj", function(){
      var template = document.createElement("div");

      var elm = stik.labs.boundary({
        name: "$elm"
      }).run({
        $template: template
      });

      expect(elm.template).toEqual(template);

      elm.addClass("active");

      expect(elm.hasClass("active")).toBeTruthy();

      elm.removeClass("active");

      expect(elm.hasClass("active")).toBeFalsy();

      elm.toggleClass("active", false);

      expect(elm.hasClass("active")).toBeFalsy();
    });
  });
});
