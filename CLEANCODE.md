## General rules
1. Follows standard conventions
2. Clean code is simple and direct. Reduce complexity as much as possible
3. Runs all tests
4. Contains no duplication
5. Expresses all the design ideas that are in the system
6. Minimizes the number of entities such as classes, methods, functions, etc
7. Boy scout rule. Leave the 'code base' cleaner than you found it
----------------------------------------------------------------------------
### Naming
1. Intention-revealing names
   - why it exists, what it does, how it is used
2. Use searchable names, even at the expense of a longer function
   - example: WORK_DAYS_PER_WEEK = 5
3. Class names and objects should have a noun or noun phrase
4. Method names should have a verb or verb phrase names
   - Public method names are short and private are usually longer and descriptive 
5. Pick one word per concept and stick to it
   - example: fetch, retrieve, get as equivalent methods of different classes

### Comments
1. Should be rare or as per convention
   - better naming = fewer comments
   - Google Python Guideline: https://google.github.io/styleguide/pyguide.html?showone=Comments#38-comments-and-docstrings
2. Good comments
   1. Informative — e.g. what a regex does
   2. Warning and consequences — e.g. SimpleDateFormat is not thread safe
   3. Intent — documents intent behind a decision
3. Bad Comments
   1. Redundant explanation
   2. Misleading comments
   3. Commented out code -- **remove it!**

### Formatting
1. File size: smaller is better. (Maximum of 500 lines)
2. Declare variables close to their usage
3. Dependent and/or similar functions should be close
   - The caller should be above the callee if possible
4. Team Rules — team formatting should be the standard

### Functions
1. Should be small. Do one thing
   - Functions should hardly ever be 20 lines long
   - Error/Exceptions are one thing—function handles errors and nothing else
   - This implies that if the keyword **_try_** exists in a function it should be the very first word, and there should be nothing after the **_catch/finally_** blocks
2. Prefer fewer arguments (max 3)
   - More than three (polyadic) requires very special justification—and then shouldn’t be used anyway
   - Try making the function a method of a class or passing in an object
3. Don't use flag/boolean arguments (function does more than one thing)
   - Split method into several independent methods that can be called from the client without the flag
4. No arguments should be used as an output
   - use method to mutate argument instead
5. Use less switch, if/else statements; instead use enums and polymporphism
   - https://obaranovskyi.medium.com/typescript-use-polymorphism-in-place-of-the-switch-and-other-conditionals-1cfcc705bcc1
   - https://refactoring.guru/replace-conditional-with-polymorphism
6. Long methods mean a class is hidden inside that method (refactor it)

### Classes and objects
1. Class name should represent its responsibility
2. Tell don't ask — it should tell what it does and not ask how (reduces coupling)
   1. https://github.com/injulkarnilesh/design-principles/tree/master/TELL_DONT_ASK/example
3. Less getters and setters
   1. Avoid getters/setters AND business logic methods together
4. Hide internal structure
5. More cohesive methods (one method changing state of many instance variables)
6. Prefer non-static methods to static methods

### Objects and data structures
1. Prefer data structures (has more getter/setters)
2. Avoid hybrid structures (data/object anti-symmetry)
   1. Objects hide their data behind abstractions and expose functions that operate on that data. 
   2. Data structure expose their data and have no meaningful functions/methods
3. No business rules/logic

### Error Handling
1. Use Exceptions rather than return codes
2. Try block should have one line
3. Avoid returning or pass Null (except for API which expects to pass Null)
   1. Prefer to return an empty object or throw an exception

### Unit Tests
1. One assert per test
2. F.I.R.S.T
   1. Fast-Running
   2. Independent
   3. Repeatable — in any env
   4. Self-Validating — Pass/Fail)
   5. Timely — before production code

### Design Rules
1. Keep configurable data at high levels
2. Use depndency injection
   1. https://python-dependency-injector.ets-labs.org/introduction/di_in_python.html
3. Separate multi-threading code
4. Recognize and separate and responsibilities of a system

### Code Smells
1. Dead Code — unused, or commented-out code
2. Inconsistency — if you do something a certain way, do all similar things in the same way
3. Rigidity — the software is difficult to change. A small change causes a cascade of subsequent changes
4. Fragility — the software breaks in many places due to a single change
5. Immobility — cannot reuse parts of the code in other projects because of involved risks and high effort

