
/*
Copyright Â© 2001-2004 World Wide Web Consortium, 
(Massachusetts Institute of Technology, European Research Consortium 
for Informatics and Mathematics, Keio University). All 
Rights Reserved. This work is distributed under the W3CÂ® Software License [1] in the 
hope that it will be useful, but WITHOUT ANY WARRANTY; without even 
the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 

[1] http://www.w3.org/Consortium/Legal/2002/copyright-software-20021231
*/



   /**
    *  Gets URI that identifies the test.
    *  @return uri identifier of test
    */
function getTargetURI() {
      return "http://www.w3.org/2001/DOM-Test-Suite/level3/core/canonicalform01";
   }

var docsLoaded = -1000000;
var builder = null;

//
//   This function is called by the testing framework before
//      running the test suite.
//
//   If there are no configuration exceptions, asynchronous
//        document loading is started.  Otherwise, the status
//        is set to complete and the exception is immediately
//        raised when entering the body of the test.
//
function setUpPage() {
   setUpPageStatus = 'running';
   try {
     //
     //   creates test document builder, may throw exception
     //
     builder = createConfiguredBuilder();
       setImplementationAttribute("namespaceAware", true);

      docsLoaded = 0;
      
      var docRef = null;
      if (typeof(this.doc) != 'undefined') {
        docRef = this.doc;
      }
      docsLoaded += preload(docRef, "doc", "barfoo");
        
       if (docsLoaded == 1) {
          setUpPageStatus = 'complete';
       }
    } catch(ex) {
    	catchInitializationError(builder, ex);
        setUpPageStatus = 'complete';
    }
}



//
//   This method is called on the completion of 
//      each asychronous load started in setUpTests.
//
//   When every synchronous loaded document has completed,
//      the page status is changed which allows the
//      body of the test to be executed.
function loadComplete() {
    if (++docsLoaded == 1) {
        setUpPageStatus = 'complete';
    }
}

//DOMErrorMonitor's require a document level variable named errorMonitor
var errorMonitor;
	 
/**
* 
Normalize document with 'canonical-form' set to true, check that
entity references are expanded and unused entity declaration are maintained.

* @author Curt Arnold
* @see http://www.w3.org/TR/2004/REC-DOM-Level-3-Core-20040407/core#Document3-normalizeDocument
* @see http://www.w3.org/TR/2004/REC-DOM-Level-3-Core-20040407/core#parameter-canonical-form
*/
function canonicalform01() {
   var success;
    if(checkInitialization(builder, "canonicalform01") != null) return;
    var doc;
      var pList;
      var pElem;
      var domConfig;
      var canSet;
      var canSetValidate;
      errorMonitor = new DOMErrorMonitor();
      
      var child;
      var childName;
      var entRef;
      var childValue;
      var entities;
      var ent2;
      var doctype;
      
      var docRef = null;
      if (typeof(this.doc) != 'undefined') {
        docRef = this.doc;
      }
      doc = load(docRef, "doc", "barfoo");
      domConfig = doc.domConfig;

      canSet = domConfig.canSetParameter("canonical-form",true);
      
	if(
	canSet
	) {
	domConfig.setParameter("canonical-form", true);
	 domConfig.setParameter("error-handler", errorMonitor.handleError);
	 pList = doc.getElementsByTagName("p");
      pElem = pList.item(0);
      entRef = doc.createEntityReference("ent1");
      child = pElem.appendChild(entRef);
      doc.normalizeDocument();
      errorMonitor.assertLowerSeverity("normalizeError", 2);
     pList = doc.getElementsByTagName("p");
      pElem = pList.item(0);
      child = pElem.lastChild;

      assertNotNull("lastChildNotNull",child);
childName = child.nodeName;

      assertEquals("firstChildName","#text",childName);
       childValue = child.nodeValue;

      assertEquals("firstChildValue","barfoo",childValue);
       
	}
	
}




function runTest() {
   canonicalform01();
}
