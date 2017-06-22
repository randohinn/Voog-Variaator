var allVariations = [];
var variationSelects = [];
var selectedBeforeChange = [];
function prePopulate() {
    allVariations = JSON.parse($('.edy-buy-button-container').attr('data-product')).variant_types;
    variationSelects = $('.form_field_select').toArray();
    return new Promise(function (fulfill, reject){
            //do stuff
            fulfill(); //if the action succeeded
            reject(); //if the action did not succeed
    });
}

function variate() {
    $('.container-var').remove();
    
    allVariations.forEach(variation => {
        variationSelects.forEach(select => {
            if(parseInt($(select).attr('data-variation-attribute-id')) === variation.id) { // Found matching select for said variation
                $(select).after('<div class="container-var container-'+variation.name+'"></div>');
                $('.container-'+variation.name).append('<div class="variant-toggle extra-padded no-leftmargin inert">'+variation.name+'</div>');
                $('.form_field_label').hide();
                $(select).hide();

                $(select).children('option').toArray().forEach(option => {
                    if($(option).text() !== "---") {
                        var t = $('.container-'+variation.name).append("<div class='variant-toggle toggle-"+variation.name+" extra-padded  toggle-"+variation.id+"' data-toggle='"+$(option).attr('value')+"'>"+$(option).text()+"</div>");
                        
                    }
                });
                $('.variant-toggle').toArray().forEach(toggle => {
                   if(selectedBeforeChange.includes($(toggle).attr('data-toggle'))) {
                       $(toggle).addClass("active");
                       select.value=$(toggle).attr('data-toggle');
                   }
                });
                $('.variant-toggle').on('click', function() {
                    $(this).parent().children('.variant-toggle').removeClass('active');
                    $(this).addClass("active");
                    select.value = $(this).attr('data-toggle');
                    
                    selectedBeforeChange = [];
                    $('.variant-toggle.active').toArray().forEach(button => {
                        console.log(button);
                        selectedBeforeChange.push($(button).attr('data-toggle')); 
                    });
                    console.log(selectedBeforeChange);
                    $(select).on('change', function() {
                                            variate();
                    });
                    select.dispatchEvent(new CustomEvent('change', { 'bubbles': true }))
                });
            }
        });
    });
    
}

prePopulate().then(function() {
    variate();
});
