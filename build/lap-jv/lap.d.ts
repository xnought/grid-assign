/************************************************************************
*
*  lap.js -- ported to javascript from
   lap.cpp
   version 1.0 - 4 September 1996
   author: Roy Jonker @ MagicLogic Optimization Inc.
   e-mail: roy_jonker@magiclogic.com
   Code for Linear Assignment Problem, according to
   "A Shortest Augmenting Path Algorithm for Dense and Sparse Linear
    Assignment Problems," Computing 38, 325-340, 1987
   by
   R. Jonker and A. Volgenant, University of Amsterdam.
*
   PORTED TO JAVASCRIPT 2017-01-02 by Philippe Riviere(fil@rezo.net)
   CHANGED 2016-05-13 by Yang Yong(yangyongeducation@163.com) in column reduction part according to
   matlab version of LAPJV algorithm(Copyright (c) 2010, Yi Cao All rights reserved)--
   https://www.mathworks.com/matlabcentral/fileexchange/26836-lapjv-jonker-volgenant-algorithm-for-linear-assignment-problem-v3-0:
*
*************************************************************************/
export declare function lap(dim: any, cost: any): {
    cost: number;
    row: Int32Array;
    col: Int32Array;
    u: Float64Array;
    v: Float64Array;
};
